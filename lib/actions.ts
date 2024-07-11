'use server';

import {redirect} from "next/navigation";
import axios from "axios";
import {revalidatePath} from "next/cache";
import {PostDataInterface} from "@/utils/types";

export async function postAnimal(data: PostDataInterface, method: string) {
  let url: string = 'https://find-pets-d8559-default-rtdb.europe-west1.firebasedatabase.app/animals.json'

  if (method === 'PUT') {
    url = `https://find-pets-d8559-default-rtdb.europe-west1.firebasedatabase.app/animals/${data.id}.json`
  }

  try {
    if (method === 'POST') {
      await axios.post(url, data)
    }
    if (method === 'PUT') {
      await axios.put(url, data)
    }

  } catch (error) {
    throw new Error('Could not post animal to the database');
  }

  if (method === 'POST') {
    revalidatePath('/animalsList')
    return redirect('/animalsList')
  }
  if (method === 'PUT') {
    return revalidatePath(`/animalsList/${data.id}`)
  }
}

export async function deleteAnimal(id: string | undefined) {
  const url =
    `https://find-pets-d8559-default-rtdb.europe-west1.firebasedatabase.app/animals/${id}.json`

  try {
    if (id) {
      await axios.delete(url)
    }

  } catch (error) {
    throw new Error('Could not delete animal from the database');
  }
  revalidatePath('/animalsList')
  return redirect('/animalsList')
}