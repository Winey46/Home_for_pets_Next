export async function getAnimalsPage({
  page,
  sortQuery,
}: {
  page: string;
  sortQuery: string;
}) {
  const response = await fetch(`/api/posts/pages/${page}/${sortQuery}`, {
    next: { tags: ["animals"] },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch animals");
  }

  return await response.json();
}

export async function getPagesCount() {
  const response = await fetch(`/api/posts/pages`, {
    next: { tags: ["animals-pages-count"] },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch pages count");
  }

  return await response.json();
}

export async function getAnimalsByUserId(userId: string) {
  try {
    const response = await fetch(`/api/users/posts/${userId}`, {
      cache: "no-cache",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user posts");
  }
}

export async function getAnimal(animalId: string) {
  const response = await fetch(`/api/posts/${animalId}`, {
    next: { tags: [`animal-${animalId}`] },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch animal details");
  }

  return await response.json();
}

export async function deleteAnimal(id: string | undefined) {
  if (id) {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (error) {
      throw new Error("Could not delete animal from the database");
    }
  }
}
