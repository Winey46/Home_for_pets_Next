'use client';

import "@/styles/newPost.scss"
import React, {useContext, useState} from "react";
import {useFormState} from "react-dom";
import Input from "./Input";
import Button from "./Button";
import Image from "./Image";
import {ModalContext} from "@/store/ModalContext";
import {postAnimal} from "@/lib/actions";

const NewPost = () => {
  const [image, setImage] = useState(null)

  const {modalClose, modalData} = useContext(ModalContext)

  const [state, formAction] = useFormState(postAnimal, null)

  const handleImageChange = (event: React.FormEvent) => {
    setImage(event.target.files[0])
  }

  return (
    <form
      className="form"
      onSubmit={modalClose}
      action={formAction}
    >
      <h2 className="form-header">
        {!modalData ? 'New Post.' : 'Edit Post'}
        {modalData &&
          <input readOnly value={modalData.id} name='post-id' className="post-id" />}
      </h2>
      <Input
        className={state && state.animalType ? "invalidInput" : "input"}
        name="animal-type"
        label="Animal Type *"
        placeholder="Enter type of your animal"
        type="text"
        error={state ? state.animalType : null}
      />
      <Input
        className={state && state.title ? "invalidInput" : "input"}
        name="new-post__title"
        label="Title *"
        placeholder="Enter your title"
        type="text"
        error={state ? state.title : null}
      />
      <Input
        className={state && state.text ? "invalidTextarea" : "textarea"}
        textarea
        name="new-post__text"
        label="Text *"
        placeholder="Enter your message"
        type="text"
        error={state ? state.text : null}
      />
      <Input
        className={state && state.contacts ? "invalidInput" : "input"}
        name="new-post__contacts"
        label="Contacts *"
        placeholder="Enter your contacts"
        type="text"
        error={state ? state.contacts : null}
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
        >Save</Button>
        <Button
          className="button yellow"
          onClick={modalClose}
          type="button"
        >Cancel</Button>
      </div>
    </form>
  )
}

export default NewPost;