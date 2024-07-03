'use client';

import "@/styles/newPost.scss"
import React, {useContext, useEffect, useState} from "react";
import Input from "./Input";
import Button from "./Button";
import Image from "./Image";
import {ModalContext} from "@/store/ModalContext";

const NewPost = () => {
  const [image, setImage] =
    useState<{} | null>(null)

  const {modalClose, modalData, formMethod} = useContext(ModalContext)

  const [animalTypeValue, setAnimalTypeValue] =
    useState<string>(modalData ? modalData.animalType : '')
  const [animalTypeError, setAnimalTypeError] =
    useState<boolean>(false)
  const animalTypeInputsChange = (event: React.FormEvent) =>
    setAnimalTypeValue(event.target.value)

  const [titleValue, setTitleValue] =
    useState<string>(modalData ? modalData.title : '')
  const [titleError, setTitleError] =
    useState<boolean>(false)
  const titleInputsChange = (event: React.FormEvent) =>
    setTitleValue(event.target.value)

  const [textValue, setTextValue] =
    useState<string>(modalData ? modalData.text : '')
  const [textError, setTextError] =
    useState<boolean>(false)
  const textInputsChange = (event: React.FormEvent) =>
    setTextValue(event.target.value)

  const [contactsValue, setContactsValue] =
    useState<string>(modalData ? modalData.contacts : '')
  const [contactsError, setContactsError] =
    useState<boolean>(false)
  const contactsInputsChange = (event: React.FormEvent) =>
    setContactsValue(event.target.value)

  const handleImageChange = (event: React.FormEvent) => {
    setImage(event.target.files[0])
  }

  function handleSubmit(event: React.FormEvent) {
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

    if (animalTypeValue.trim().length > 2 && titleValue.trim().length > 2 &&
      textValue.trim().length > 2 && contactsValue.trim().length > 2) {

      // submit(event.currentTarget, {method: formMethod, action: "/"})
      modalClose()
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
      encType="multipart/form-data"
      className="form"
      onSubmit={handleSubmit}
      method={formMethod}
    >
      <h2 className="form-header">
        {!modalData ? 'New Post.' : 'Edit Post'} {modalData &&
        <input readOnly value={modalData.id} name='post-id' className="post-id" />}
      </h2>

      <Input
        className={animalTypeError ? "invalidInput" : "input"}
        name="animal-type"
        label="Animal Type *"
        placeholder="Enter type of your animal"
        type="text"
        defaultValue={animalTypeValue}
        onChange={animalTypeInputsChange}
        error={animalTypeError ? 'Should contain at least 3 symbols' : null}
      />

      <Input
        className={titleError ? "invalidInput" : "input"}
        name="new-post__title"
        label="Title *"
        placeholder="Enter your title"
        type="text"
        defaultValue={titleValue}
        onChange={titleInputsChange}
        error={titleError ? 'Should contain at least 3 symbols' : null}
      />

      <Input
        className={textError ? "invalidTextarea" : "textarea"}
        textarea
        name="new-post__text"
        label="Text *"
        placeholder="Enter your message"
        type="text"
        defaultValue={textValue}
        onChange={textInputsChange}
        error={textError ? 'Should contain at least 3 symbols' : null}
      />

      <Input
        className={contactsError ? "invalidInput" : "input"}
        name="new-post__contacts"
        label="Contacts *"
        placeholder="Enter your contacts"
        type="text"
        defaultValue={contactsValue}
        onChange={contactsInputsChange}
        error={contactsError ? 'Should contain at least 3 symbols' : null}
      />
      {modalData && !image ?
        <Image imgSrc={modalData.image.link ? modalData.image.link : "/pets-default.jpg"} /> :
        !modalData && !image ? null :
          <Image imgSrc={URL.createObjectURL(image)} />}
      <Input
        name="new-post__image"
        label="Choose image"
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleImageChange}
      />
      <div className="buttons-wrapper">
        <Button
          className="button purple"
          type="submit"
          // disabled={isSubmitting}
        >Save</Button>
        <Button
          className="button yellow"
          onClick={modalClose}
          type="button"
          // disabled={isSubmitting}
        >Cancel</Button>
      </div>
    </form>
  )
}

export default NewPost;