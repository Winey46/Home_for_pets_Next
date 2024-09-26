"use client";

import React, { useState, useEffect, useRef } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import ImagePreview from "@/components/ui/ImagePreview";
import { IPostData } from "@/utils/interfaces";
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createPost, editPost } from "@/lib/create-post";

interface NewPostProps {
  modalClose: () => void;
  postData?: IPostData;
}

const NewPost = ({ modalClose, postData }: NewPostProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [dragging, setDragging] = useState<boolean>(false);

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

  const imageRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const path = usePathname();

  const createMutation = useMutation({
    mutationFn: createPost,
  });
  const editMutation = useMutation({
    mutationFn: editPost,
  });

  const handleImagePicker = () => {
    imageRef.current.click();
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();

    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();

    setDragging(false);

    const droppedFile = event.dataTransfer.files[0];
    setImage(droppedFile);
  };

  async function handleSubmit(event: React.FormEvent<HTMLButtonElement>) {
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
      const formData = new FormData();
      formData.append("animalType", animalTypeValue);
      formData.append("title", titleValue);
      formData.append("text", textValue);
      formData.append("contacts", contactsValue);
      formData.append("image", image);

      if (!postData) {
        const response = await createMutation.mutateAsync(formData);
        if (response.status === 201 && path !== "/animalsList")
          router.push("/animalsList");
        if (response.status === 201 && path === "/animalsList")
          router.refresh();
      } else {
        const response = await editMutation.mutateAsync({
          formData,
          animalId: postData._id,
        });
        if (response.status === 200) router.refresh();
      }

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
      id="new-post__form"
      className="w-[1024px] flex flex-col items-center gap-6 self-start max-md:w-[610px] max-sm:w-[360px] mx-[5%]"
    >
      <h2 className="text-[2rem] my-[5px]">
        {postData ? "Edit Post." : "New Post."}
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

      <div
        className={
          dragging
            ? "w-full p-[10px] flex flex-col items-center gap-2 bg-neutral-100 rounded-[10px] border-[1px] border-gray-600 border-dashed"
            : "w-full p-[10px] flex flex-col items-center gap-2 bg-neutral-100 rounded-[10px] border-[1px] border-gray-600"
        }
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {image && <ImagePreview imgSrc={URL.createObjectURL(image)} />}

        {postData?.image.imageLink && !image && (
          <ImagePreview imgSrc={postData.image.imageLink} />
        )}

        <Input
          ref={imageRef}
          className="hidden"
          name="new-post__image"
          type="file"
          handleChange={handleImageChange}
        />
        <Button
          className="button purple self-start"
          type="button"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          handleClick={handleImagePicker}
        >
          Choose an image
        </Button>
      </div>
      <Button
        className="button yellow mb-8"
        type="submit"
        handleClick={handleSubmit}
        disabled={createMutation.isPending || editMutation.isPending}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {createMutation.isPending || editMutation.isPending
          ? "Submitting..."
          : "Save Post"}
      </Button>
    </form>
  );
};

export default NewPost;
