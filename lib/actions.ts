'use server';

import {deleteImage, getDate, uploadImage} from "@/utils/helpers";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import {PostDataInterface} from "@/utils/interfaces";

export async function postAnimal(formData: FormData) {
  let url: string = 'https://find-pets-d8559-default-rtdb.europe-west1.firebasedatabase.app/animals.json'
  let method = 'POST'

  const id = formData.get('post-id') as string

  if (id) {
    url = `https://find-pets-d8559-default-rtdb.europe-west1.firebasedatabase.app/animals/${id}.json`
    method = 'PUT'
  }

  const data: PostDataInterface = {
    animalType: formData.get('animal-type') as string,
    title: formData.get('new-post__title') as string,
    text: formData.get('new-post__text') as string,
    date: getDate(),
    contacts: formData.get('new-post__contacts') as string,
    imageName: null,
    imageLink: null
  }

  const image = formData.get('new-post__image') as File | null

  try {
    if (method === 'PUT') {
      const response = await fetch(url)
      const prevData = await response.json()

      await deleteImage(prevData.imageName)
    }

    if (image && image.name.length) {
      const imageResponse = await uploadImage(image)
      data.imageName = imageResponse.imageName
      data.imageLink = imageResponse.imageLink
    }

    await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

  } catch (error) {
    throw new Error('Could not post animal to the database');
  }
  if (method === 'PUT') {
    revalidatePath('/animalsList')
    return revalidatePath(`/animalsList/${id}`)
  }

  revalidatePath('/animalsList')
  return redirect('/animalsList')
}

export async function deleteAnimal(id: string | undefined) {
  const url =
    `https://find-pets-d8559-default-rtdb.europe-west1.firebasedatabase.app/animals/${id}.json`

  try {
    if (id) {
      await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

  } catch (error) {
    throw new Error('Could not delete animal from the database');
  }
  revalidatePath(`/animalsList/${id}`)
}