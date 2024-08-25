import { dbConnect } from "@/lib/database";
import { IPostData, ISessionUser } from "@/utils/interfaces";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getDate, uploadImage } from "@/utils/helpers";
import { revalidateTag } from "next/cache";
import { Post } from "@/models/post.model";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();

  const session = await getServerSession(authOptions);
  const sessionUser = session?.user as ISessionUser;
  if (!session)
    new Response("Only authenticated users can create posts", {
      status: 401,
    });

  const newPost: IPostData = {
    animalType: formData.get("animalType") as string,
    contacts: formData.get("contacts") as string,
    date: getDate() as string,
    text: formData.get("text") as string,
    title: formData.get("title") as string,
    userId: sessionUser.id,
    imageName: null,
    imageLink: null,
  };

  if (
    newPost.animalType.trim().length < 3 ||
    newPost.title.trim().length < 3 ||
    newPost.text.trim().length < 3 ||
    newPost.contacts.trim().length < 3
  ) {
    return new Response("Inputs should contain at least 3 symbols", {
      status: 400,
    });
  }
  const image = formData.get("image") as File;

  try {
    const imageResponse = await uploadImage(image);
    newPost.imageName = imageResponse.imageName;
    newPost.imageLink = imageResponse.imageLink;

    await dbConnect();

    await Post.create(newPost);
  } catch (error) {
    console.log(error);
    return new Response("Failed to create post", { status: 500 });
  }

  revalidateTag("animals");

  return new Response("Post has been created", { status: 201 });
};
