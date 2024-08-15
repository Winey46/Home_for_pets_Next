import { dbConnect } from "@/lib/database";
import { Post } from "@/models/post.model";
import { deleteImage, getDate, uploadImage } from "@/utils/helpers";
import { revalidatePath } from "next/cache";

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
  const image = formData.get("image");

  try {
    await dbConnect();

    const animal = await Post.findById(params.animalId);
    await deleteImage(animal.imageName);

    const imageResponse = await uploadImage(image);

    await Post.findByIdAndUpdate(params.animalId, {
      animalType: formData.get("animalType"),
      contacts: formData.get("contacts"),
      date: getDate(),
      text: formData.get("text"),
      title: formData.get("title"),
      imageName: imageResponse.imageName,
      imageLink: imageResponse.imageLink,
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to edit post", { status: 500 });
  }

  revalidatePath('/animalsList');
  revalidatePath(`/animalsList/${params.animalId}`);
  
  return new Response("Post has been edited", { status: 200 });
};

export const DELETE = async (request, { params }) => {
  try {
    await dbConnect();

    const response = await Post.findByIdAndDelete(params.animalId);
    if (!response) return new Response("Post Not Found", { status: 404 });

    return new Response("Post deleted successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to delete post", { status: 500 });
  }
};
