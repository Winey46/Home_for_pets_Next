import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "@firebase/storage";
import { storage } from "@/firebase";
import { uuidv4 } from "@firebase/util";

export function getDate(): string {
  const time = `[${new Date().getHours()} : ${new Date().getMinutes()}]`;

  const formatter = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const formattedDate = formatter.format(new Date());

  return `${time} ${formattedDate}`;
}

export async function uploadImage(
  image: File | null,
  directory: string = "images"
) {
  try {
    const imageRef = ref(
      storage,
      `${directory}/${image.name.slice(0, -4)}-${uuidv4()}`
    );

    const imageResponse = await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(
      ref(storage, `${directory}/${imageResponse.metadata.name}`)
    );

    return {
      imageLink: imageUrl,
      imageName: imageResponse.metadata.name,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function deleteImage(
  imageName: string | null,
  directory: string = "images"
) {
   await deleteObject(ref(storage, `${directory}/${imageName}`));
}

export const createArithmeticProgression = (
  length: number,
  start: number,
  difference: number
) => {
  return Array.from({ length }, (_, index) => start + index * difference);
};
