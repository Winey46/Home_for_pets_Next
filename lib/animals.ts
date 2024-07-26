'use server';

import process from "node:process";

export async function getAllAnimals() {
  const url: string = String(process.env.ANIMALS_DB_CONNECTION_STRING) + '.json'

  try {
    const response = await fetch(url, {cache: 'force-cache'})

    return response.json()

  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch data')
  }
}

export async function getAnimal(animalId: string) {
  const url: string = String(process.env.ANIMALS_DB_CONNECTION_STRING) + `/${animalId}.json`

  try {
    const response = await fetch(url, {cache: 'force-cache'})

    return response.json()

  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch animal details')
  }
}