export async function getAllAnimals() {
  try {
    const response = await fetch("http://localhost:3000/api/posts", {
      next: { tags: ["animals"] },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return new Error("Failed to fetch animals");
  }
}

export async function getAnimalsPage(page) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/posts/pages/${page}`,
      {
        next: { tags: [`animals-page-${page}`] },
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return new Error("Failed to fetch animals page");
  }
}

export async function getPagesCount() {
  try {
    const response = await fetch(`http://localhost:3000/api/posts/pages`, {
      next: { tags: [`animals-pages`] },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return new Error("Failed to fetch pages count");
  }
}

export async function getAnimal(animalId: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/posts/${animalId}`,
      { next: { tags: [animalId] } }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return new Error("Failed to fetch animal details");
  }
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
