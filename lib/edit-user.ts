export async function editUser({ formData, userId }) {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
      method: "PUT",
      body: formData,
      cache: "no-cache",
    });
    return response;
  } catch (error) {
    console.error(error.message);
    throw new Error("Could not change user profile information");
  }
}
