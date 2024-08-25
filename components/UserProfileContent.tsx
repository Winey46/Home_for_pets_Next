"use client";

import { IPostData, ISessionUser } from "@/utils/interfaces";
import { useSession } from "next-auth/react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import Image from "next/image";
import AnimalCart from "./AnimalCart";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { editUser } from "@/lib/edit-user";
import { useRouter } from "next/navigation";

interface UserProfileContentProps {
  animals: IPostData[];
}

export default function UserProfileContent({
  animals,
}: UserProfileContentProps) {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] =
    useState<boolean>(false);

  const session = useSession();
  const sessionUser = session?.data?.user as ISessionUser;

  const router = useRouter();

  const filteredPets = animals.filter(
    (animal) => animal.userId === sessionUser?.id
  );

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const editUserMutation = useMutation({
    mutationFn: editUser,
    onSuccess() {
      router.push("/");
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    let isSubmit = { email: true, password: true };

    if (
      !email.includes("@") ||
      !email.includes(".") ||
      email === sessionUser.email
    ) {
      setEmailError(true);
      isSubmit.email = false;
    }

    if (
      password.trim().length < 6 ||
      !/[A-Z]/.test(password.trim()) ||
      !/[a-z]/.test(password.trim()) ||
      !/\d/.test(password.trim())
    ) {
      setPasswordError(true);
      isSubmit.password = false;
    }

    if (!password || password !== confirmPassword) {
      setConfirmPasswordError(true);
      isSubmit.password = false;
    }

    const editedUser = {
      newEmail: null,
      newPassword: null,
      userId: sessionUser?.id,
    };

    if (isSubmit.email) editedUser.newEmail = email;
    if (isSubmit.password) editedUser.newPassword = password;

    if (isSubmit.email || isSubmit.password) {
      await editUserMutation.mutateAsync(editedUser);
    }
  };

  return (
    <div className="flex flex-col max-w-[1024px] items-center w-[98%] py-[2%] min-h-[576px] border-[1px] border-gray-600 rounded-[10px] bg-neutral-100">
      <div className="flex w-full min-h-[450px] max-w-[910px]">
        {sessionUser && (
          <form className="flex flex-col gap-4 w-[70%] items-center px-[5%]">
            <h2 className="text-xl font-[500] mb-6">{sessionUser?.name}</h2>
            <Input
              className="input mb-8"
              name="profile_email"
              label="Email *"
              placeholder="Your new password"
              type="text"
              defaultValue={sessionUser?.email}
              handleChange={handleEmailChange}
              error={
                emailError && passwordError && confirmPasswordError
                  ? "Should contain '@' and '.' symbols"
                  : null
              }
            />
            <Input
              className={passwordError ? "invalid-input" : "input"}
              name="profile_password"
              label="Password *"
              type="password"
              placeholder="Your new password"
              handleChange={handlePasswordChange}
              error={
                emailError &&
                passwordError &&
                confirmPasswordError &&
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
              className="button purple"
              disabled={
                editUserMutation.isPending ||
                ((!email.length || email === sessionUser?.email) &&
                  (!password.length || !confirmPassword.length))
              }
              handleClick={handleSubmit}
            >
              {editUserMutation.isPending ? "Submitting..." : "Save"}
            </Button>
          </form>
        )}
        <div className="flex flex-col items-center w-[30%]">
          <h3 className="text-xl">Avatar:</h3>
          <Image
            className="w-full my-8 rounded-[50%]"
            src="/avatar-logo.png"
            alt="avatar_logo"
            width={256}
            height={256}
          />
          <Input name="avatar-image" type="file" />
        </div>
      </div>
      <h3 className="px-[50px] text-lg font-[500] self-start">My Posts:</h3>
      <ul className="max-w-[920px] w-full flex flex-wrap gap-[5px] bg-white rounded-[10px] px-[5px]">
        {filteredPets.length ? (
          filteredPets.map((animal) => (
            <AnimalCart
              key={animal._id}
              to={`/animalsList/${animal._id}`}
              imgSrc={animal.imageLink}
              title={animal.title}
            />
          ))
        ) : (
          <p className="max-w-[910px] w-full flex justify-center items-center text-2xl h-[310px] text-center px-[2%]">
            There are no available pets.
          </p>
        )}
      </ul>
    </div>
  );
}
