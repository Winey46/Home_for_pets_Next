'use server';

import {getDate} from "@/utils/functions";
import {getDownloadURL, ref, uploadBytes} from "@firebase/storage";
import {storage} from "@/firebase";
import {uuidv4} from "@firebase/util";
import {redirect} from "next/navigation";
import axios from "axios";
import {revalidatePath} from "next/cache";


export async function postAnimal(prevState, formData) {
  const image = formData.get('new-post__image')

  let url = 'https://find-pets-d8559-default-rtdb.europe-west1.firebasedatabase.app/animals.json'

  const postData = {
    animalType: formData.get('animal-type'),
    title: formData.get('new-post__title'),
    text: formData.get('new-post__text'),
    date: getDate(),
    contacts: formData.get('new-post__contacts'),
    image: {name: image.name},
  }

  const errorMessages = {}

  if (postData.animalType.trim().length < 3) {
    errorMessages.animalType = 'Animal type should contain at least 3 symbols'
  }

  if (postData.title.trim().length < 3) {
    errorMessages.title = 'Title should contain at least 3 symbols'
  }

  if (postData.text.trim().length < 3) {
    errorMessages.text = 'Text should contain at least 3 symbols'
  }

  if (postData.contacts.trim().length < 3) {
    errorMessages.contacts = 'Contacts should contain at least 3 symbols'
  }

  if (errorMessages.animalType ||
    errorMessages.title ||
    errorMessages.text ||
    errorMessages.contacts) {
    return errorMessages
  }

  const imageRef = ref(storage, `images/${(image.name).slice(0, -4)}-${uuidv4()}`)

  try {
    if (image.name.length > 0) {
      const imageResponse = await uploadBytes(imageRef, image)
      postData.image.name = imageResponse.metadata.name

      postData.image.link = await getDownloadURL(
        ref(storage, `images/${imageResponse.metadata.name}`))
    }

    await axios.post(url, postData)

    // if (request.method === 'PUT') {
    //   const id = data.get('post-id')
    //
    //   url = `https://find-pets-d8559-default-rtdb.europe-west1.firebasedatabase.app/animals/${id}.json`
    //
    //   const oldDataResponse = await axios.get(url)
    //
    //   if (image.name === '') {
    //     postData.image.link = oldDataResponse.data.image.link
    //     postData.image.name = oldDataResponse.data.image.name
    //
    //   } else {
    //     const deleteRef = ref(storage,
    //       `images/${oldDataResponse.data.image.name}`)
    //     await deleteObject(deleteRef)
    //
    //     const uploadImage = await uploadBytes(imageRef,
    //       data.get('new-post__image'))
    //     postData.image.name = uploadImage.metadata.name
    //
    //     postData.image.link = await getDownloadURL(
    //       ref(storage, `images/${uploadImage.metadata.name}`))
    //   }
    //   await axios.put(url, postData)
    //
    //   return redirect(`/animalsList/${id}`)
    // }
  } catch (error) {
    throw new Error('Could not post animal to the database');
  }
  revalidatePath('/animalsList')
  return redirect('/animalsList')
}