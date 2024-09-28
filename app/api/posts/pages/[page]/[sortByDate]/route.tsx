import { dbConnect } from "@/lib/database";
import { Post } from "@/models/post.model";
import { SortOrder } from "mongoose";

export const GET = async (request, { params }) => {
  const page = params.page;
  const sortByDate = params.sortByDate;

  const limit = 40;
  const offset = (page - 1) * limit;

  let sort = -1 as SortOrder;
  if (sortByDate === "old") sort = 1;

  try {
    await dbConnect();

    const response = await Post.find({})
      .sort({ createdAt: sort })
      .skip(offset)
      .limit(limit);

    const posts = JSON.stringify(response);

    return new Response(posts, { status: 200 });
  } catch (error) {
    return new Response(`Failed to fetch posts of page #${page}`, {
      status: 500,
    });
  }
};
