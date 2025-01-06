export async function createPost(formData: FormData) {
  try {
    const response = await fetch("/api/posts/new", {
      method: "POST",
      body: formData,
    });

    return response;
  } catch (error) {
    console.error(error.message);
    throw new Error("Could not create post");
  }
}

export async function editPost({ formData, animalId }) {
  try {
    const response = await fetch(
      `/api/posts/${animalId}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    return response;
  } catch (error) {
    console.error(error.message);
    throw new Error("Could not edit post");
  }
}
