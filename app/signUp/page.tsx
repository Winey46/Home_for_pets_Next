"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import PortalProvider from "@/components/ui/PortalProvider";
import Modal from "@/components/ui/Modal";
import SignIn from "@/components/SignIn";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [signInState, setSignInState] = useState<boolean>(false);

  const router = useRouter();

  const [nameValue, setNameValue] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);
  const nameInputChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setNameValue(event.target.value);

  const [emailValue, setEmailValue] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const emailInputChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setEmailValue(event.target.value);

  const [passwordValue, setPasswordValue] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const passwordInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => setPasswordValue(event.target.value);

  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] =
    useState<boolean>(false);
  const confirmPasswordInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => setConfirmPasswordValue(event.target.value);

  const handleSignInOpen = (): void => {
    setSignInState(true);
    document.body.style.overflow = "hidden";
  };

  const handleSignInClose = (): void => {
    setSignInState(false);
    document.body.style.overflow = "";
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let isSubmit = true;

    if (nameValue.trim().length < 2) {
      setNameError(true);
      isSubmit = false;
    }

    if (!emailValue.trim().includes("@")) {
      setEmailError(true);
      isSubmit = false;
    }

    if (
      passwordValue.trim().length < 6 ||
      !/[A-Z]/.test(passwordValue.trim()) ||
      !/[a-z]/.test(passwordValue.trim()) ||
      !/\d/.test(passwordValue.trim())
    ) {
      setPasswordError(true);
      isSubmit = false;
    }

    if (passwordValue.trim() !== confirmPasswordValue.trim()) {
      setConfirmPasswordError(true);
      isSubmit = false;
    }

    if (isSubmit) {
      const formData = new FormData(event.currentTarget);

      const name = formData.get("registration-name");
      const email = formData.get("registration-email");
      const password = formData.get("registration-password");

      const response = await fetch("/api/registration", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Could not create account");
      }

      response.status === 201 && router.push("/");
    }
  };

  useEffect(() => {
    if (nameValue.trim().length >= 2) {
      setNameError(false);
    }

    if (emailValue.trim().includes("@")) {
      setEmailError(false);
    }

    if (
      passwordValue.trim().length >= 6 &&
      /[A-Z]/.test(passwordValue) &&
      /[a-z]/.test(passwordValue) &&
      /\d/.test(passwordValue)
    ) {
      setPasswordError(false);
    }

    if (passwordValue.trim() === confirmPasswordValue.trim()) {
      setConfirmPasswordError(false);
    }
  }, [nameValue, emailValue, passwordValue, confirmPasswordValue]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[1024px] bg-[#f2f2f2] border-[1px] border-gray-400 rounded-[10px] py-[10px] px-[5%] flex flex-col items-center shadow-lg gap-4"
    >
      <p className="self-end">
        Already have an account?{" "}
        <span
          onClick={handleSignInOpen}
          className="text-[#833de7] hover:text-[#fbc43c] hover:cursor-pointer"
        >
          Sign in
        </span>
      </p>
      <h2 className="w-[90%] text-[1.75rem]">Sign Up</h2>
      <p className="w-[90%]">Join the best platform for finding pets.</p>
      <Input
        className={nameError ? "invalid-input" : "input"}
        name="registration-name"
        label="Name"
        type="text"
        placeholder="Enter your name"
        handleChange={nameInputChange}
        error={nameError ? "Should contain at least 2 symbols" : null}
      />
      <Input
        className={emailError ? "invalid-input" : "input"}
        name="registration-email"
        label="Email"
        type="text"
        placeholder="Enter your email"
        handleChange={emailInputChange}
        error={emailError ? "Should contain '@' symbol" : null}
      />
      <Input
        className={passwordError ? "invalid-input" : "input"}
        name="registration-password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        handleChange={passwordInputChange}
      />
      <ul className="w-full">
        <li className="text-[0.8rem]"> - At least 6 characters</li>
        <li className="text-[0.8rem]"> - Contains numbers</li>
        <li className="text-[0.8rem]">
          - Contains uppercase and lowercase characters
        </li>
      </ul>
      <Input
        className={confirmPasswordError ? "invalid-input" : "input"}
        name="registration-confirm"
        label="Confirm Password"
        type="password"
        placeholder="Repeat your password"
        handleChange={confirmPasswordInputChange}
        error={confirmPasswordError ? "Passwords should match" : null}
      />
      <div className="w-full flex justify-center">
        <Button type="submit" className="button purple">
          Create account
        </Button>
      </div>
      {signInState && (
        <PortalProvider root="modal">
          <Modal modalClose={handleSignInClose}>
            <SignIn signInClose={handleSignInClose} />
          </Modal>
        </PortalProvider>
      )}
    </form>
  );
}
