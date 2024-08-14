import { dbConnect } from "@/lib/database";
import { IPostData, ISessionUser } from "@/utils/interfaces";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getDate, uploadImage } from "@/utils/helpers";
import { createPost } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const formData = await request.formData();

  const session = await getServerSession(authOptions);
  const sessionUser = session?.user as ISessionUser;

  const newPost: IPostData = {
    animalType: formData.get("animalType"),
    contacts: formData.get("contacts"),
    date: getDate(),
    text: formData.get("text"),
    title: formData.get("title"),
    userId: sessionUser.id,
  };
  const image = formData.get("image");

  try {
    const imageResponse = await uploadImage(image);
    newPost.imageName = imageResponse.imageName
    newPost.imageLink = imageResponse.imageLink

    await dbConnect();

    await createPost(newPost);

  } catch (error) {
    console.log(error);
    return new Error(error.message || "Failed to create post");
  }

  revalidatePath("/animalsList");

  return new NextResponse("Post has been created", { status: 201 });
};
