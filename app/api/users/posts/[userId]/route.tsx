import { dbConnect } from "@/lib/database";
import { Post } from "@/models/post.model";

export const GET = async (request, { params }) => {
  try {
    await dbConnect();

    const response = await Post.find({ userId: params.userId });
    if (!response) return new Response("User posts are not found", { status: 404 });

    const post = JSON.stringify(response);

    return new Response(post, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch user posts", { status: 500 });
  }
};
