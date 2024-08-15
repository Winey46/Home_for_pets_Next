'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAllAnimals() {
  try {
    const response = await fetch("http://localhost:3000/api/posts");

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch animals", {
      status: 500,
    });
  }
}

export async function getAnimal(animalId: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/posts/${animalId}`);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch animal details", {
      status: 500,
    });
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
    return new Response("Could not delete animal from the database", {
      status: 500,
    });
  }
  revalidatePath("/animalsList")

  return redirect("/animalsList");
}
