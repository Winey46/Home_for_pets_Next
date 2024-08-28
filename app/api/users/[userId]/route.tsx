import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { dbConnect } from "@/lib/database";
import { User } from "@/models/user.model";
import { deleteImage, uploadImage } from "@/utils/helpers";

export const PUT = async (request: NextRequest, { params }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(
      "Only authenticated users can edit his user profile information",
      {
        status: 401,
      }
    );
  }

  const formData = await request.formData();

  const newName = formData.get("profile_name") as string;
  const newEmail = formData.get("profile_email") as string;
  const newPassword = formData.get("profile_password") as string;
  const newImage = formData.get("profile_image") as File | undefined;

  if (newName && newName.length < 2) {
    return new Response("Name does not match validation rules", {
      status: 500,
    });
  }

  if (newEmail && (!newEmail.includes("@") || !newEmail.includes("."))) {
    return new Response("Email does not match validation rules", {
      status: 500,
    });
  }

  if (
    newPassword.length &&
    (newPassword.trim().length < 6 ||
      !/[A-Z]/.test(newPassword.trim()) ||
      !/[a-z]/.test(newPassword.trim()) ||
      !/\d/.test(newPassword.trim()))
  ) {
    return new Response("Password does not match validation rules", {
      status: 500,
    });
  }

  try {
    await dbConnect();

    const existingUser = await User.findById(params.userId);

    if (!existingUser) {
      return new Response("User not found", { status: 404 });
    }

    if (newName) {
      existingUser.name = newName;
    }

    if (newEmail) {
      existingUser.email = newEmail;
    }

    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 5);

      existingUser.password = hashedPassword;
    }

    if (newImage.name) {
      if (existingUser.image.imageLink) {
        await deleteImage(existingUser.image.imageName);
      }

      const imageResponse = await uploadImage(newImage);
      existingUser.image = imageResponse;
    }

    await existingUser.save();

    return new Response(JSON.stringify(existingUser.image), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to change user profile information", {
      status: 500,
    });
  }
};
