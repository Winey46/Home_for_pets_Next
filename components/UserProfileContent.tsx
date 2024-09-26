"use client";

import { IPostData, ISessionUser } from "@/utils/interfaces";
import Input from "./ui/Input";
import Button from "./ui/Button";
import Image from "next/image";
import AnimalCart from "./AnimalCart";
import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { editUser } from "@/lib/edit-user";
import { useSession } from "next-auth/react";
import PortalProvider from "./ui/PortalProvider";
import Modal from "./ui/Modal";
import InformationPanel from "./InformationPanel";

interface UserProfileContentProps {
  animals: IPostData[];
  sessionUser: ISessionUser;
}

export default function UserProfileContent({
  animals,
  sessionUser,
}: UserProfileContentProps) {
  const [name, setName] = useState<string | undefined>(sessionUser.name);
  const [nameError, setNameError] = useState<boolean>(false);

  const [email, setEmail] = useState<string | undefined>(sessionUser.email);
  const [emailError, setEmailError] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] =
    useState<boolean>(false);

  const [image, setImage] = useState<File | undefined>();
  const [dragging, setDragging] = useState<boolean>(false);

  const [informationPanel, setInformationPanel] = useState<boolean>(false);

  const imageRef = useRef<HTMLInputElement | null>(null);

  const { update } = useSession();

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: editUser,
    onSuccess(data) {
      if (data.ok)
        data.json().then((res) => update({ name, email, image: res }));

      setInformationPanel(true);
    },
  });

  const handleInformationPanelClose = () => {
    setInformationPanel(false);
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file: File | null = event.target.files[0];

    if (file) {
      setImage(file);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
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

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleImagePicker = () => {
    imageRef.current.click();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    let isSubmit = true;

    if (!name || name.length < 2) {
      setNameError(true);
      isSubmit = false;
    }

    if (!email || !email.includes("@") || !email.includes(".")) {
      setEmailError(true);
      isSubmit = false;
    }

    if (
      password &&
      (password.trim().length < 6 ||
        !/[A-Z]/.test(password.trim()) ||
        !/[a-z]/.test(password.trim()) ||
        !/\d/.test(password.trim()))
    ) {
      setPasswordError(true);
      isSubmit = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      isSubmit = false;
    }

    if (isSubmit) {
      const formData = new FormData();
      formData.append("profile_name", name);
      formData.append("profile_email", email);
      formData.append("profile_password", password);
      formData.append("profile_image", image);

      mutate({ formData, userId: sessionUser.id });
    }
  };

  useEffect(() => {
    if (!name || name.length >= 2) {
      setNameError(false);
    }

    if (email || email?.includes("@") || email?.includes(".")) {
      setEmailError(false);
    }

    if (
      password &&
      (password.trim().length >= 6 ||
        /[A-Z]/.test(password.trim()) ||
        /[a-z]/.test(password.trim()) ||
        /\d/.test(password.trim()))
    ) {
      setPasswordError(false);
    }

    if (password === confirmPassword) {
      setConfirmPasswordError(false);
    }
  }, [name, email, password, confirmPassword, sessionUser]);

  return (
    <div className="flex flex-col max-w-[1024px] items-center w-full py-[5px] min-h-[576px] border-[1px] border-gray-600 rounded-[10px] bg-neutral-100">
      <h2 className="text-xl font-[500] mb-6">Profile</h2>
      <div className="flex w-full min-h-[450px] max-w-[910px]">
        {sessionUser && (
          <form className="flex flex-col gap-4 w-[70%] items-center px-[5%]">
            <Input
              className={nameError ? "invalid-input" : "input"}
              name="profile_name"
              label="Name *"
              placeholder="Your new name"
              type="text"
              defaultValue={sessionUser?.name}
              handleChange={handleNameChange}
              error={nameError ? "Should contain at least 2 symbols" : null}
            />
            <Input
              className={emailError ? "invalid-input mb-6" : "input mb-6"}
              name="profile_email"
              label="Email *"
              placeholder="Your new password"
              type="text"
              defaultValue={sessionUser?.email}
              handleChange={handleEmailChange}
              error={emailError ? "Should contain '@' and '.' symbols" : null}
            />
            <Input
              className={passwordError ? "invalid-input" : "input"}
              name="profile_password"
              label="Password *"
              type="password"
              placeholder="Your new password"
              handleChange={handlePasswordChange}
              error={
                passwordError &&
                "Should contain at least 6 symbols, upper and lower case symbols and numbers"
              }
            />
            <Input
              className={confirmPasswordError ? "invalid-input" : "input"}
              name="profile_confirm_password"
              label="Password confirmation *"
              type="password"
              placeholder="Confirm your new password"
              handleChange={handleConfirmPasswordChange}
              error={confirmPasswordError ? "Passwords should match" : null}
            />
            <Button
              className="button yellow"
              disabled={isPending}
              handleClick={handleSubmit}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {isPending ? "Submitting..." : "Save"}
            </Button>
          </form>
        )}
        <div
          className={
            dragging
              ? "border-2 border-dashed border-gray-600 flex flex-col items-center w-[30%] p-[1%]"
              : "flex flex-col items-center w-[30%] p-[1%]"
          }
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Image
            className="w-full aspect-square object-cover my-8 rounded-[50%]"
            src={
              image
                ? URL.createObjectURL(image)
                : sessionUser?.image.imageLink
                ? sessionUser?.image.imageLink
                : "/avatar-logo.png"
            }
            alt="avatar_logo"
            width={256}
            height={256}
          />
          <Input
            ref={imageRef}
            className="hidden"
            name="avatar-image"
            type="file"
            handleChange={handleImageChange}
          />
          <Button
            className="button purple"
            type="button"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            handleClick={handleImagePicker}
          >
            Choose an image
          </Button>
        </div>
      </div>

      {informationPanel && (
        <PortalProvider root="modal">
          <Modal className="h-16 absolute top-[155px] left-[3%] flex gap-12 items-center bg-white rounded-md shadow">
            <InformationPanel
              isSuccess={isSuccess}
              handleClose={handleInformationPanelClose}
            >
              {isSuccess ? "Saved successfuly!" : error.message}
            </InformationPanel>
          </Modal>
        </PortalProvider>
      )}

      <h3 className="px-[50px] text-lg font-[500] self-start">My Posts:</h3>
      <ul className="w-full flex flex-wrap gap-[5px] bg-white rounded-[10px] px-[5px]">
        {animals.length ? (
          animals.map((animal) => (
            <AnimalCart
              key={animal._id}
              to={`/animalsList/${animal._id}`}
              imgSrc={animal.image.imageLink}
              title={animal.title}
            />
          ))
        ) : (
          <p className="w-full flex justify-center items-center text-2xl h-[310px] text-center px-[2%]">
            There are no available pets.
          </p>
        )}
      </ul>
    </div>
  );
}
