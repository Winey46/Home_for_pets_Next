'use client';

import { FormEvent } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

interface SignInProps {
  signInClose: () => void;
}

export default function SignIn({ signInClose }: SignInProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const handleSignUp = (): void => {
    router.push("/signUp")

    signInClose()
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const response = await signIn('credentials', {
      email: formData.get('signin-email'),
      password: formData.get('signin-password'),
      redirect: false,
    })

    if (response && !response.error) {
      // router.push("/")

      signInClose()
    } else {
      console.log(response)
    }
  }

  return (
    <form className="w-[960px] flex flex-col my-6 items-center max-lg:w-[610px] max-sm:w-[360px]"
      onSubmit={handleSubmit}>
      <h2 className="w-80% text-center">Sign In</h2>
      <Input
        className="input"
        name="signin-email"
        placeholder="Enter your login"
        label="Login"
        type="email"
      />
      <Input
        className="input"
        name="signin-password"
        placeholder="Enter your password"
        label="Password"
        type="password"
      />
      <div className="w-[80%] flex flex-col my-6">
        <Button className="button yellow self-start">Sign in</Button>
        <Button className="button purple self-end" handleClick={() => signIn('google', { callbackUrl })}>
          Sign in with Google
        </Button>
      </div>

      <p className="w-[80%] text-end">
        Not a member yet? <span
          className="text-[#833de7] underline hover:text-[#fbc43c] hover:cursor-pointer"
          onClick={handleSignUp}
        >
          Sign Up here
        </span>
      </p>
    </form>
  )
}