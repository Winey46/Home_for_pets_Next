import axios from "axios";

export async function getAllAnimals() {
  try {
    const response = await axios.get(
      'https://find-pets-d8559-default-rtdb.europe-west1.firebasedatabase.app/animals.json', {
        next: {revalidate: 1}
        // cache: 'no-store'
      })

    return response.data

  } catch (error) {
    throw new Error(error.message, {
      status: error.response.status,
      statusText: error.response.statusText
    });
  }
}