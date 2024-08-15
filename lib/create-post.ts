export async function createPost(formData: FormData) {
  try {
    const response = await fetch("http://localhost:3000/api/posts/new", {
      method: "POST",
      body: formData,
    });

    return response;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message || "Could not create post");
  }
}

export async function editPost(formData: FormData, animalId: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/posts/${animalId}`, {
      method: "PUT",
      body: formData,
    });

    return response;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message || "Could not create or edit post");
  }
}
