import { dbConnect } from "@/lib/database";
import { Post } from "@/models/post.model";

export const GET = async () => {
  try {
    await dbConnect();

    const response = await Post.countDocuments();
    const posts = Number(JSON.stringify(response));

    const pages = Math.ceil(posts / 40).toString();

    return new Response(pages, { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch pages count", { status: 500 });
  }
};
