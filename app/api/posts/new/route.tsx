import { dbConnect } from "@/lib/database";
import { IPostData, ISessionUser } from "@/utils/interfaces";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getDate, uploadImage } from "@/utils/helpers";
import { revalidatePath } from "next/cache";
import { Post } from "@/models/post.model";

export const POST = async (request) => {
  const formData = await request.formData();

  const session = await getServerSession(authOptions);
  // if(!session)...
  const sessionUser = session?.user as ISessionUser;

  const newPost: IPostData = {
    animalType: formData.get("animalType"),
    contacts: formData.get("contacts"),
    date: getDate(),
    text: formData.get("text"),
    title: formData.get("title"),
    userId: sessionUser.id,
    // image:{...}
  };
  const image = formData.get("image");

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

  revalidatePath("/animalsList");

  return new Response("Post has been created", { status: 201 });
};
