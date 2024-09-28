import { dbConnect } from "@/lib/database";
import { Post } from "@/models/post.model";

export const GET = async (request, { params }) => {
  const page = params.page;
  const sortByDate = params.sortByDate;

  const limit = 40;
  const offset = (page - 1) * limit;

  try {
    await dbConnect();

    let response;
    if (sortByDate === "old") {
      response = await Post.find({})
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit);
    } else {
      response = await Post.find({}).skip(offset).limit(limit);
    }

    const posts = JSON.stringify(response);

    return new Response(posts, { status: 200 });
  } catch (error) {
    return new Response(`Failed to fetch posts of page #${page}`, {
      status: 500,
    });
  }
};
