"use client";

import React, { useState, useEffect } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import ImagePreview from "@/components/ui/ImagePreview";
import { postAnimal } from "@/lib/actions";
import { PostDataInterface } from "@/utils/interfaces";

interface NewPostProps {
  modalClose: () => void;
  postData?: PostDataInterface;
}

const NewPost = ({ modalClose, postData }: NewPostProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file: File | null = event.target.files[0];

    if (file) {
      setImage(file);
    }
  };

  const [animalTypeValue, setAnimalTypeValue] = useState<string>(
    postData ? postData.animalType : ""
  );
  const [animalTypeError, setAnimalTypeError] = useState<boolean>(false);
  const animalTypeInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => setAnimalTypeValue(event.target.value);

  const [titleValue, setTitleValue] = useState<string>(
    postData ? postData.title : ""
  );
  const [titleError, setTitleError] = useState<boolean>(false);
  const titleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setTitleValue(event.target.value);

  const [textValue, setTextValue] = useState<string>(
    postData ? postData.text : ""
  );
  const [textError, setTextError] = useState<boolean>(false);
  const textInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => setTextValue(event.target.value);

  const [contactsValue, setContactsValue] = useState<string>(
    postData ? postData.contacts : ""
  );
  const [contactsError, setContactsError] = useState<boolean>(false);
  const contactsInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => setContactsValue(event.target.value);

  function handleSubmit(event: React.FormEvent<HTMLButtonElement>): void {
    event.preventDefault();

    let isSubmit = true;

    if (animalTypeValue.trim().length < 3) {
      setAnimalTypeError(true);
      isSubmit = false;
    }

    if (titleValue.trim().length < 3) {
      setTitleError(true);
      isSubmit = false;
    }

    if (textValue.trim().length < 3) {
      setTextError(true);
      isSubmit = false;
    }

    if (contactsValue.trim().length < 3) {
      setContactsError(true);
      isSubmit = false;
    }

    if (isSubmit) {
      setIsSubmitting(true);
      event.currentTarget.form?.requestSubmit();

      setIsSubmitting(false);
      modalClose();
    }
  }

  useEffect(() => {
    if (animalTypeValue.trim().length >= 3) {
      setAnimalTypeError(false);
    }

    if (titleValue.trim().length >= 3) {
      setTitleError(false);
    }

    if (textValue.trim().length >= 3) {
      setTextError(false);
    }

    if (contactsValue.trim().length >= 3) {
      setContactsError(false);
    }
  }, [animalTypeValue, titleValue, textValue, contactsValue]);

  return (
    <form
      className="w-[1024px] flex flex-col items-center gap-6 self-start max-md:w-[610px] max-sm:w-[360px] mx-[5%]"
      action={postAnimal}
    >
      <h2 className="text-[2rem] my-[5px]">
        {postData ? "Edit Post." : "New Post."}
        {postData && (
          <input
            readOnly
            value={postData.id}
            name="post-id"
            className="hidden"
          />
        )}
      </h2>
      <Input
        className={animalTypeError ? "invalid-input" : "input"}
        name="animal-type"
        label="Animal Type *"
        placeholder="Enter type of your animal"
        type="text"
        defaultValue={animalTypeValue}
        handleChange={animalTypeInputChange}
        error={animalTypeError ? "Should contain at least 3 symbols" : null}
      />
      <Input
        className={titleError ? "invalid-input" : "input"}
        name="new-post__title"
        label="Title *"
        placeholder="Enter your title"
        type="text"
        defaultValue={titleValue}
        handleChange={titleInputChange}
        error={titleError ? "Should contain at least 3 symbols" : null}
      />
      <Input
        className={textError ? "invalid-input" : "input"}
        textarea
        name="new-post__text"
        label="Text *"
        placeholder="Enter your message"
        type="text"
        defaultValue={textValue}
        handleTextareaChange={textInputChange}
        error={textError ? "Should contain at least 3 symbols" : null}
      />
      <Input
        className={contactsError ? "invalid-input" : "input"}
        name="new-post__contacts"
        label="Contacts *"
        placeholder="Enter your contacts"
        type="text"
        defaultValue={contactsValue}
        handleChange={contactsInputChange}
        error={contactsError ? "Should contain at least 3 symbols" : null}
      />

      {image && <ImagePreview imgSrc={URL.createObjectURL(image)} />}
      {postData && postData.imageLink && !image && (
        <ImagePreview imgSrc={postData.imageLink} />
      )}

      <Input
        name="new-post__image"
        label="Choose an image"
        placeholder="Choose an image"
        type="file"
        handleChange={handleImageChange}
      />
      <Button
        className="button purple mb-8"
        type="submit"
        disabled={isSubmitting}
        handleClick={handleSubmit}
      >
        {isSubmitting ? "Submitting..." : "Save Post"}
      </Button>
    </form>
  );
};

export default NewPost;
