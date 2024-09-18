import { dbConnect } from "@/lib/database";
import { Post } from "@/models/post.model";
import { deleteImage, getDate, uploadImage } from "@/utils/helpers";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { authOptions } from "../../auth/[...nextauth]/route";
import { IPostData } from "@/utils/interfaces";

export const GET = async (request, { params }) => {
  try {
    await dbConnect();

    const response = await Post.findById(params.animalId);
    if (!response) return new Response("Post Not Found", { status: 404 });

    const post = JSON.stringify(response);

    return new Response(post, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch post", { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  const formData = await request.formData();

  const session = await getServerSession(authOptions);
  if (!session)
    new Response("Only authenticated users can edit posts", {
      status: 401,
    });

  const editedPost: IPostData = {
    animalType: formData.get("animalType"),
    contacts: formData.get("contacts"),
    text: formData.get("text"),
    title: formData.get("title"),
  };

  if (
    editedPost.animalType.trim().length < 3 ||
    editedPost.title.trim().length < 3 ||
    editedPost.text.trim().length < 3 ||
    editedPost.contacts.trim().length < 3
  ) {
    return new Response("Inputs should contain at least 3 symbols", {
      status: 400,
    });
  }

  const image = formData.get("image");

  if (image?.name) {
    try {
      const animal = await Post.findById(params.animalId);
      await deleteImage(animal.image.imageName);

      const imageResponse = await uploadImage(image);

      await Post.findByIdAndUpdate(params.animalId, {
        image: {
          imageName: imageResponse.imageName,
          imageLink: imageResponse.imageLink,
        },
      });
    } catch (error) {
      console.error(error);
      return new Response("Failed to save image", { status: 500 });
    }
  }

  try {
    await dbConnect();

    await Post.findByIdAndUpdate(params.animalId, {
      animalType: editedPost.animalType,
      contacts: editedPost.contacts,
      date: getDate(),
      text: editedPost.text,
      title: editedPost.title,
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to edit post", { status: 500 });
  }

  revalidateTag("animals");
  revalidateTag(`animal-${params.animalId}`);
  // revalidateTag("animals-pages-count");

  return new Response("Post has been edited", { status: 200 });
};

export const DELETE = async (request, { params }) => {
  const session = await getServerSession(authOptions);
  if (!session)
    new Response("Only authenticated users can edit posts", {
      status: 401,
    });

  try {
    await dbConnect();

    const response = await Post.findByIdAndDelete(params.animalId);
    if (!response) return new Response("Post Not Found", { status: 404 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to delete post", { status: 500 });
  }

  revalidateTag("animals");
  // revalidateTag(`animal-${params.animalId}`);
  revalidateTag("animals-pages-count");

  return new Response("Post deleted successfully", { status: 200 });
};
