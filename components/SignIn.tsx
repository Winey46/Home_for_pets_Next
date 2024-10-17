"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import PortalProvider from "./ui/PortalProvider";
import Modal from "./ui/Modal";
import InformationPanel from "./InformationPanel";

interface SignInProps {
  signInClose: () => void;
}

export default function SignIn({ signInClose }: SignInProps) {
  const [emailValue, setEmailValue] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const emailInputChange = (event: ChangeEvent<HTMLInputElement>): void =>
    setEmailValue(event.target.value);

  const [passwordValue, setPasswordValue] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const passwordInputChange = (event: ChangeEvent<HTMLInputElement>): void =>
    setPasswordValue(event.target.value);

  const [informationPanel, setInformationPanel] = useState<boolean>(false);
  const [informationStatus, setInformationStatus] = useState<string>("");

  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || path;

  const handleSignUp = (): void => {
    router.push("/signUp");
    signInClose();
  };

  const handleInformationPanelClose = () => {
    setInformationPanel(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setInformationPanel((prevState) => false);

    let isSubmit = true;

    if (!emailValue.includes("@")) {
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

    if (isSubmit) {
      const response = await signIn("credentials", {
        email: emailValue,
        password: passwordValue,
        redirect: false,
      });

      if (!response.ok) {
        console.error(response.error);
        setInformationPanel((prevState) => true);
        setInformationStatus("Could not sign in.");
      } else signInClose();
    }
  };

  useEffect(() => {
    if (emailValue.includes("@")) {
      setEmailError(false);
    }
    if (passwordValue.trim().length >= 6) {
      setPasswordError(false);
    }
    if (
      passwordValue.trim().length >= 6 ||
      /[A-Z]/.test(passwordValue) ||
      /[a-z]/.test(passwordValue) ||
      /\d/.test(passwordValue)
    ) {
      setPasswordError(false);
    }
  }, [emailValue, passwordValue]);

  return (
    <div className="flex flex-col my-6 items-center w-[1024px] gap-6 mx-[5%]">
      <h2 className="w-full text-center text-xl font-[500]">Sign In</h2>
      <Input
        className={emailError ? "invalid-input" : "input"}
        name="signin-email"
        placeholder="Enter your email"
        label="Email"
        type="text"
        handleChange={emailInputChange}
        error={emailError && "Should contain '@' symbol"}
      />
      <Input
        className={passwordError ? "invalid-input" : "input"}
        name="signin-password"
        placeholder="Enter your password"
        label="Password"
        type="password"
        handleChange={passwordInputChange}
        error={
          passwordError &&
          "Should contain at least 6 symbols, upper and lower case symbols and numbers"
        }
      />
      <div className="flex flex-col w-full">
        <Button
          className="button yellow self-start"
          type="button"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          handleClick={handleSubmit}
        >
          Sign in
        </Button>
        <Button
          className="button purple self-end gap-2"
          type="button"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          handleClick={() => signIn("google", { callbackUrl })}
        >
          <Image
            src="/Google-logo.png"
            alt="Google_logo"
            width={35}
            height={35}
          />
          Sign in with Google
        </Button>
      </div>
      <p className="w-full text-end">
        Not a member yet?{" "}
        <span
          className="text-[#833de7] underline hover:text-[#fbc43c] hover:cursor-pointer"
          onClick={handleSignUp}
        >
          Sign Up here
        </span>
      </p>

      {informationPanel && (
        <PortalProvider root="modal">
          <Modal className="h-16 absolute top-[155px] left-[3%] flex gap-12 items-center bg-white rounded-md shadow">
            <InformationPanel
              isSuccess={false}
              handleClose={handleInformationPanelClose}
            >
              {informationStatus.length > 0 && informationStatus}
            </InformationPanel>
          </Modal>
        </PortalProvider>
      )}
    </div>
  );
}
