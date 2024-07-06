'use client';

import React, {useState} from "react";
import {useFormState} from "react-dom";
import Input from "./Input";
import Button from "./ui/Button";
import Image from "./Image";
import {postAnimal} from "@/lib/actions";

const NewPost = ({modalClose}: () => void) => {
  const [image, setImage] = useState(null)
  const [state, formAction] = useFormState(postAnimal, null)

  const handleImageChange = (event: React.FormEvent) => {
    setImage(event.target.files[0])
  }

  return (
    <form
      className="w-[960px] flex flex-col items-center gap-6 self-start max-md:w-[610px] max-sm:w-[360px]"
      onSubmit={!state ? modalClose : undefined}
      action={formAction}
    >
      {/*<h2 className="form-header">*/}
      {/*{!modalData ? 'New Post.' : 'Edit Post'}*/}
      {/*{modalData &&*/}
      {/*  <input readOnly value={modalData.id} name='post-id' className="post-id" />}*/}
      {/*</h2>*/}
      <Input
        className={state && state.animalType ?
          "w-full h-12 border-[1px] border-red-600 rounded-[5px] bg-transparent focus:outline-none placeholder:text-[1rem]" :
          "w-full h-12 border-b-[1px] border-b-purple-800 bg-transparent"}
        name="animal-type"
        label="Animal Type *"
        placeholder="Enter type of your animal"
        type="text"
        error={state ? state.animalType : null}
      />
      <Input
        className={state && state.title ?
          "w-full h-12 border-[1px] border-b-red-600 rounded-[5px] bg-transparent focus:outline-none placeholder:text-[1rem]" :
          "w-full h-12 border-b-[1px] border-b-purple-800 bg-transparent"}
        name="new-post__title"
        label="Title *"
        placeholder="Enter your title"
        type="text"
        error={state ? state.title : null}
      />
      <Input
        className={state && state.text ?
          "w-full h-12 border-[1px] border-b-red-600 rounded-[5px] bg-transparent focus:outline-none placeholder:text-[1rem]" :
          "w-full h-12 border-b-[1px] border-b-purple-800 bg-transparent"}
        textarea
        name="new-post__text"
        label="Text *"
        placeholder="Enter your message"
        type="text"
        error={state ? state.text : null}
      />
      <Input
        className={state && state.contacts ?
          "w-full h-12 border-[1px] border-b-red-600 rounded-[5px] bg-transparent focus:outline-none placeholder:text-[1rem]" :
          "w-full h-12 border-b-[1px] border-b-purple-800 bg-transparent"}
        name="new-post__contacts"
        label="Contacts *"
        placeholder="Enter your contacts"
        type="text"
        error={state ? state.contacts : null}
      />
      {/*{modalData && !image ?*/}
      {/*  <Image imgSrc={modalData.image.link ? modalData.image.link : "/pets-default.jpg"} /> :*/}
      {/*  !modalData && !image ? null :*/}
      {/*    <Image imgSrc={URL.createObjectURL(image)} />}*/}
      <Input
        name="new-post__image"
        label="Choose image"
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleImageChange}
      />
      <div className="flex m-[15px] gap-[50px]">
        <Button
          className="flex justify-center items-center py-[1rem] px-[1.5rem] rounded-[5px] text-[1rem] text-neutral-100 bg-purple-600 hover:bg-purple-700 max-md:text-[0.9rem] max-md:py-[0.6rem] max-md:px-[0.8rem]"
          type="submit"
        >Save</Button>
        <Button
          className="flex justify-center items-center py-[1rem] px-[1.5rem] rounded-[5px] text-[1rem] bg-amber-400 hover:bg-amber-500 max-md:text-[0.9rem] max-md:py-[0.6rem] max-md:px-[0.8rem]"
          onClick={modalClose}
          type="button"
        >Cancel</Button>
      </div>
    </form>
  )
}

export default NewPost;