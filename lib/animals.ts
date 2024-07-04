'use server';

export async function getAllAnimals() {
  const response = await fetch(
    'https://find-pets-d8559-default-rtdb.europe-west1.firebasedatabase.app/animals.json', {
      next: {revalidate: 60}
    })

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  return response.json()
}

export async function getAnimal(animalId) {
  const url =
    `https://find-pets-d8559-default-rtdb.europe-west1.firebasedatabase.app/animals/${animalId}.json`

  const response = await fetch(url, {
    next: {revalidate: 300}
  })

  if (!response.ok) {
    throw new Error('Failed to fetch animal details')
  }

  return response.json()
}