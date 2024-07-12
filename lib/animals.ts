'use server';

export async function getAllAnimals() {
  try {
    const response = await fetch('https://find-pets-d8559-default-rtdb.europe-west1.firebasedatabase.app/animals.json',
      {
        next: {revalidate: 60}
      })

    return response.json()

  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch data')
  }
}

export async function getAnimal(animalId: string) {
  const url =
    `https://find-pets-d8559-default-rtdb.europe-west1.firebasedatabase.app/animals/${animalId}.json`

  try {
    const response = await fetch(url, {
      next: {revalidate: 300}
    })

    return response.json()

  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch animal details')
  }
}