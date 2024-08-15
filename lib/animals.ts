export async function getAllAnimals() {
  // const url: string = process.env.ANIMALS_DB_CONNECTION_STRING + '.json'

  try {
    // const response = await fetch(url, {cache: 'force-cache'})
    const response = await fetch("http://localhost:3000/api/posts");

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Response(error.message || "Failed to fetch data", {
      status: 500,
    });
  }
}

export async function getAnimal(animalId: string) {
  const url: string =
    String(process.env.ANIMALS_DB_CONNECTION_STRING) + `/${animalId}.json`;

  try {
    const response = await fetch(url, { cache: "force-cache" });

    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch animal details");
  }
}
