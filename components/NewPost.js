'use client';

import "@/styles/newPost.scss"
import {useEffect, useState} from "react";
import Input from "./Input.js";
import Button from "./Button.js";
import Image from "./Image.js";

export default function NewPost({formMethod, data, onClose}) {
  const [image, setImage] = useState(null)

  const [animalTypeValue, setAnimalTypeValue] = useState(
    data ? data.animalType : '')
  const [animalTypeError, setAnimalTypeError] = useState(false)
  const animalTypeInputsChange = (event) => setAnimalTypeValue(
    event.target.value)

  const [titleValue, setTitleValue] = useState(
    data ? data.title : '')
  const [titleError, setTitleError] = useState(false)
  const titleInputsChange = (event) => setTitleValue(
    event.target.value)

  const [textValue, setTextValue] = useState(
    data ? data.text : '')
  const [textError, setTextError] = useState(false)
  const textInputsChange = (event) => setTextValue(
    event.target.value)

  const [contactsValue, setContactsValue] = useState(
    data ? data.contacts : '')
  const [contactsError, setContactsError] = useState(false)
  const contactsInputsChange = (event) => setContactsValue(
    event.target.value)

  // const submit = useSubmit()
  // const navigation = useNavigation()
  // const isSubmitting = navigation.state === 'submitting'

  const handleImageChange = (event) => {
    setImage(event.target.files[0])
  }

  function handleSubmit(event) {
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

      submit(event.currentTarget, {method: formMethod, action: "/"})
      onClose()
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
        {!data ? 'New Post.' : 'Edit Post'} {data &&
        <input readOnly value={data.id} name='post-id' className="post-id" />}
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
      {data && !image ?
        <Image imgSrc={data.image.link ? data.image.link : "/pets-default.jpg"} /> :
        !data && !image ? null :
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
          onClick={onClose}
          type="button"
          // disabled={isSubmitting}
        >Cancel</Button>
      </div>
    </form>
  )
}