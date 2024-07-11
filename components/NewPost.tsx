'use client';

import React, {useState, useEffect} from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import ImagePreview from "@/components/ui/ImagePreview";
import {postAnimal} from "@/lib/actions";
import {deleteImage, getDate, uploadImage} from "@/utils/helpers";
import {PostDataInterface} from "@/utils/types";

interface NewPostProps {
  modalClose: () => void;
  postData?: PostDataInterface;
}

const NewPost = ({modalClose, postData}: NewPostProps) => {
  const [image, setImage] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0])
    }
  }

  const [animalTypeValue, setAnimalTypeValue] =
    useState<string>(postData ? postData.animalType : '')
  const [animalTypeError, setAnimalTypeError] = useState<boolean>(false)
  const animalTypeInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => setAnimalTypeValue(
    event.target.value)

  const [titleValue, setTitleValue] =
    useState<string>(postData ? postData.title : '')
  const [titleError, setTitleError] = useState<boolean>(false)
  const titleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => setTitleValue(event.target.value)

  const [textValue, setTextValue] =
    useState<string>(postData ? postData.text : '')
  const [textError, setTextError] = useState<boolean>(false)
  const textInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => setTextValue(event.target.value)

  const [contactsValue, setContactsValue] =
    useState<string>(postData ? postData.contacts : '')
  const [contactsError, setContactsError] = useState<boolean>(false)
  const contactsInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => setContactsValue(event.target.value)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    if (animalTypeValue.trim().length < 3) {
      setAnimalTypeError(true)
    }

    if (titleValue.trim().length < 3) {
      setTitleError(true)
    }

    if (textValue.trim().length < 3) {
      setTextError(true)
    }

    if (contactsValue.trim().length < 3) {
      setContactsError(true)
    }

    if (animalTypeValue.trim().length > 2 &&
      titleValue.trim().length > 2 &&
      textValue.trim().length > 2 &&
      contactsValue.trim().length > 2) {

      setIsSubmitting(true)

      const data: PostDataInterface = {
        animalType: animalTypeValue,
        title: titleValue,
        text: textValue,
        date: getDate(),
        contacts: contactsValue,
        imageLink: null,
        imageName: null,
      }

      if (postData) {
        data.id = postData.id
      }

      if (image && image.name.length > 0) {
        uploadImage(image)
          .then(imageResponse => {
            data.imageName = imageResponse.imageName
            data.imageLink = imageResponse.imageLink
          })
        if (postData && postData.imageName) {
          deleteImage(postData.imageName)
            .then(() => postAnimal(data, 'PUT'))
            .then(() => modalClose()).finally(() => setIsSubmitting(false))
        } else if (postData) {
          postAnimal(data, 'PUT')
            .then(() => modalClose()).finally(() => setIsSubmitting(false))
        } else {
          postAnimal(data, 'POST')
            .then(() => modalClose()).finally(() => setIsSubmitting(false))
        }
      } else if (!image && postData) {
        postAnimal(data, 'PUT')
          .then(() => modalClose()).finally(() => setIsSubmitting(false))
      } else {
        postAnimal(data, 'POST')
          .then(() => modalClose()).finally(() => setIsSubmitting(false))
      }
    }
  }

  useEffect(() => {
    if (animalTypeValue.trim().length >= 3) {
      setAnimalTypeError(false)
    }

    if (titleValue.trim().length >= 3) {
      setTitleError(false)
    }

    if (textValue.trim().length >= 3) {
      setTextError(false)
    }

    if (contactsValue.trim().length >= 3) {
      setContactsError(false)
    }
  }, [animalTypeValue, titleValue, textValue, contactsValue]);

  return (
    <form
      className="w-[960px] flex flex-col items-center gap-6 self-start max-md:w-[610px] max-sm:w-[360px]"
      onSubmit={handleSubmit}
    >
      <h2 className="text-[2rem] my-[5px]">
        {postData ? 'Edit Post.' : 'New Post.'}
      </h2>
      <Input
        className={animalTypeError ?
          "w-full h-12 border-[1px] border-red-600 rounded-[5px] bg-transparent focus:outline-none placeholder:text-[1rem]" :
          "w-full h-12 border-b-[1px] border-b-purple-800 bg-transparent"}
        name="animal-type"
        label="Animal Type *"
        placeholder="Enter type of your animal"
        type="text"
        defaultValue={animalTypeValue}
        handleChange={animalTypeInputChange}
        error={animalTypeError ? 'Should contain at least 3 symbols' : null}
      />
      <Input
        className={titleError ?
          "w-full h-12 border-[1px] border-b-red-600 rounded-[5px] bg-transparent focus:outline-none placeholder:text-[1rem]" :
          "w-full h-12 border-b-[1px] border-b-purple-800 bg-transparent"}
        name="new-post__title"
        label="Title *"
        placeholder="Enter your title"
        type="text"
        defaultValue={titleValue}
        handleChange={titleInputChange}
        error={titleError ? 'Should contain at least 3 symbols' : null}
      />
      <Input
        className={textError ?
          "w-full h-12 border-[1px] border-b-red-600 rounded-[5px] bg-transparent focus:outline-none placeholder:text-[1rem]" :
          "w-full h-12 border-b-[1px] border-b-purple-800 bg-transparent"}
        textarea
        name="new-post__text"
        label="Text *"
        placeholder="Enter your message"
        type="text"
        defaultValue={textValue}
        handleTextareaChange={textInputChange}
        error={textError ? 'Should contain at least 3 symbols' : null}
      />
      <Input
        className={contactsError ?
          "w-full h-12 border-[1px] border-b-red-600 rounded-[5px] bg-transparent focus:outline-none placeholder:text-[1rem]" :
          "w-full h-12 border-b-[1px] border-b-purple-800 bg-transparent"}
        name="new-post__contacts"
        label="Contacts *"
        placeholder="Enter your contacts"
        type="text"
        defaultValue={contactsValue}
        handleChange={contactsInputChange}
        error={contactsError ? 'Should contain at least 3 symbols' : null}
      />

      {image && <ImagePreview imgSrc={URL.createObjectURL(image)} />}
      {postData && postData.imageLink && !image && <ImagePreview imgSrc={postData.imageLink} />}

      <Input
        name="new-post__image"
        label="Choose image"
        type="file"
        handleChange={handleImageChange}
      />
      <div className="flex m-[15px] gap-[50px]">
        <Button
          className="flex justify-center items-center py-[1rem] px-[1.5rem] rounded-[5px] text-[1rem] text-neutral-100 bg-purple-600 hover:bg-purple-700 max-md:text-[0.9rem] max-md:py-[0.6rem] max-md:px-[0.8rem]"
          type="submit"
          disabled={isSubmitting}
        >{isSubmitting ? 'Submitting' : 'Save'}</Button>
        <Button
          className="flex justify-center items-center py-[1rem] px-[1.5rem] rounded-[5px] text-[1rem] bg-amber-400 hover:bg-amber-500 max-md:text-[0.9rem] max-md:py-[0.6rem] max-md:px-[0.8rem]"
          handleClick={modalClose}
          type="button"
        >Cancel</Button>
      </div>
    </form>
  )
}

export default NewPost;