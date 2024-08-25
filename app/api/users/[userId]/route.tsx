import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { ISessionUser } from "@/utils/interfaces";
import { dbConnect } from "@/lib/database";
import { User } from "@/models/user.model";

export const PUT = async (request: NextRequest, { params }) => {
  const { newEmail, newPassword } = await request.json();

  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(
      "Only authenticated users can edit his user profile information",
      {
        status: 401,
      }
    );
  }

  if (newEmail && (!newEmail.includes("@") || !newEmail.includes("."))) {
    return new Response("Email does not match validation rules", {
      status: 500,
    });
  }

  if (
    newPassword &&
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

    if (newEmail) {
      await User.findByIdAndUpdate(params.userId, { email: newEmail });
    }

    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 5);

      await User.findByIdAndUpdate(params.userId, { password: hashedPassword });
    }
  } catch (error) {
    console.error(error);
    return new Response("Failed to change user profile information", {
      status: 500,
    });
  }

  return new Response("User profile information has been changed", {
    status: 200,
  });
};
