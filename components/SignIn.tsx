"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

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

  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || path;

  const handleSignUp = (): void => {
    router.push("/signUp");
    signInClose();
  };

  const handleSubmit = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    let isSubmit = true;

    if (!emailValue.includes("@")) {
      setEmailError(true);
      isSubmit = false;
    }

    if (passwordValue.trim().length < 6) {
      setPasswordError(true);
      isSubmit = false;
    }

    if (isSubmit) {
      const response = await signIn("credentials", {
        email: emailValue,
        password: passwordValue,
        redirect: false,
      });

      if (response.error) {
        console.log(response);
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
        error={passwordError && "Should contain at least 6 symbols"}
      />
      <div className="flex flex-col w-full">
        <Button
          className="button yellow self-start"
          type="button"
          handleClick={handleSubmit}
        >
          Sign in
        </Button>
        <Button
          className="button purple self-end"
          type="button"
          handleClick={() => signIn("google", { callbackUrl })}
        >
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
    </div>
  );
}
