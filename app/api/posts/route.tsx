import { dbConnect } from "@/lib/database";
import { Post } from "@/models/post.model";

export const GET = async () => {
  try {
    await dbConnect();

    const response = await Post.find({});
    const posts = JSON.stringify(response);

    return new Response(posts, { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all posts", { status: 500 });
  }
};
