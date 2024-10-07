export async function getAnimalsPage({
  page,
  sortQuery,
}: {
  page: string;
  sortQuery: string;
}) {
  const response = await fetch(
    `http://localhost:3000/api/posts/pages/${page}/${sortQuery}`,
    {
      next: { tags: ["animals"] },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch page with animals");
  }

  return await response.json();
}

export async function getPagesCount() {
  try {
    const response = await fetch(`http://localhost:3000/api/posts/pages`, {
      next: { tags: [`animals-pages-count`] },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return new Error("Failed to fetch pages count");
  }
}

export async function getAnimalsByUserId(userId: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/users/posts/${userId}`,
      { cache: "no-cache" }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return new Error("Failed to fetch user posts");
  }
}

export async function getAnimal(animalId: string) {
  const response = await fetch(`http://localhost:3000/api/posts/${animalId}`, {
    next: { tags: [`animal-${animalId}`] },
  });

  if (!response.ok) {
    return new Error("Failed to fetch animal details");
  }

  return await response.json();
}

export async function deleteAnimal(id: string | undefined) {
  try {
    if (id) {
      await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.error(error);
    return new Error("Could not delete animal from the database");
  }
}
