export async function editUser({ newName, newEmail, newPassword, userId }) {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify({ newName, newEmail, newPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error(error.message);
    throw new Error("Could not change user profile information");
  }
}
