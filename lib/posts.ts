import { Post } from "@/models/post.model";

export async function createPost(post) {
  try {
    const newPost = await Post.create(post);
  } catch (error) {
    throw new Error(error.message || "Could not create post");
  }
}
