export async function createPost(formData: FormData) {
  try {
    const response = await fetch("/api/posts/new", {
      method: "POST",
      body: formData,
    });

    return response
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message || "Could not create post")
  }
}
