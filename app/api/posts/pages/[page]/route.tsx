import { dbConnect } from "@/lib/database";
import { Post } from "@/models/post.model";

export const GET = async (request, { params }) => {
  const page = params.page;
  const limit = 2;
  const offset = (page - 1) * limit;

  try {
    await dbConnect();

    const response = await Post.find({}).skip(offset).limit(limit);
    const post = JSON.stringify(response);

    return new Response(post, { status: 200 });
  } catch (error) {
    return new Response(`Failed to fetch posts of page #${page}`, {
      status: 500,
    });
  }
};
