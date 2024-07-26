'use client';

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import PortalProvider from "@/components/ui/PortalProvider";
import Modal from "@/components/ui/Modal";
import SignIn from "@/components/SignIn";
import React, {useState} from "react";
import {useRouter} from "next/navigation";

export default function Page() {
  const [signInState, setSignInState] = useState<boolean>(false)
  const router = useRouter()

  const handleSignInOpen = (): void => {
    setSignInState(true)
    document.body.style.overflow = 'hidden'
  }

  const handleSignInClose = (): void => {
    setSignInState(false)
    document.body.style.overflow = ''
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const formData = new FormData(event.currentTarget)

      const name = formData.get('registration-name')
      const email = formData.get('registration-email')
      const password = formData.get('registration-password')

      const response = await fetch('/api/registration', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      response.status === 201 && router.push('/')

    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-[50px] w-[960px] bg-[#f2f2f2] border-[1px] border-gray-400 rounded-[10px] py-[10px] px-[50px] flex flex-col items-center shadow-lg max-lg:w-[610px] max-sm:w-[425px]">
      <p className="self-end">Already have an account? <span
        onClick={handleSignInOpen}
        className="text-[#833de7] hover:text-[#fbc43c] hover:cursor-pointer"
      >Sign in</span>
      </p>
      <h2 className="w-[90%] text-[1.75rem]">Sign Up</h2>
      <p className="w-[90%]">Join the best platform for finding pets.</p>
      <Input
        className="input"
        name="registration-name"
        label="Name"
        type="text"
        placeholder="Enter your name"
      />
      <Input
        className="input"
        name="registration-email"
        label="Email"
        type="email"
        placeholder="Enter your email"
      />
      <Input
        className="input"
        name="registration-password"
        label="Password"
        type="password"
        placeholder="Enter your password"
      />
      <ul className="w-[90%] mb-[30px]">
        <li className="text-[0.8rem]"> - At least 6 characters</li>
        <li className="text-[0.8rem]"> - Contains numbers</li>
        <li className="text-[0.8rem]">
          - Contains uppercase and lowercase characters
        </li>
      </ul>
      <div className="w-[90%] flex mb-[25px]">
        <Button type="submit" className="button purple">Create account</Button>
      </div>

      {signInState &&
        <PortalProvider root='modal'>
          <Modal modalClose={handleSignInClose}>
            <SignIn signInClose={handleSignInClose}/>
          </Modal>
        </PortalProvider>
      }

    </form>
  )
}