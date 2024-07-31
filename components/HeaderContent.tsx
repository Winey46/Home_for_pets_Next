'use client';

import Image from "next/image";
import {AnimatePresence, motion} from "framer-motion";
import {openArrow} from "@/utils/symbols";
import Button from "@/components/ui/Button";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";

interface HeaderContentProps {
  toggleNavigation: () => void;
  navigation: boolean;
  modalOpen: () => void;
  signInOpen: () => void;
}

export default function HeaderContent({toggleNavigation, navigation, modalOpen, signInOpen}: HeaderContentProps) {
  const session = useSession()

  if (session.data) {
    console.log(session.data)
  }

  return (
    <div
      className="flex justify-center w-full h-[75px] border-[1px] border-b-gray-400 shadow-lg bg-[#f2f2f2] backg max-lg:gap-[25] max-lg:px-[5%]">
      <div className="flex w-[960px] max-lg:w-[610px] max-sm:w-[360px]">
        <div className="flex justify-between items-center w-[960px] max-lg:w-full max-lg:px-1.5">
          <div
            className="flex items-center justify-center gap-[5px] text-[1.25rem] hover:cursor-pointer hover:text-[#fbc43c]"
            data-testid="header-logo"
            onClick={toggleNavigation}
          >
            <Image
              src="/pets-logo.png"
              alt="pets_logo"
              className="h-[30px] w-auto"
              width={35}
              height={35}
            />
            <span className="max-lg:hidden">Home for Pets</span>
            <AnimatePresence>
              <motion.span
                className="flex items-center justify-center"
                animate={{rotate: navigation ? 0 : 180}}
              >
                {openArrow}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-[75px]">
            <Button
              className="button yellow"
              handleClick={modalOpen}
            >
              Add Post+
            </Button>
            <div className="flex items-center gap-[25px]">
              {session?.data ?
                <>
                  <Link href="/userProfile">{session?.data?.user?.name}</Link>
                  <Link href="#" onClick={() => signOut({callbackUrl: '/'})}>Sign Out</Link>
                </> :
                <Button
                  className="button purple px-[1rem] py-[0.5rem]"
                  handleClick={signInOpen}
                >
                  Sign in
                </Button>
              }
              {/*{!session.data &&*/}
              {/*  <Link*/}
              {/*    href="/signUp"*/}
              {/*    className="link hover:text-[#fbc43c]"*/}
              {/*  >*/}
              {/*    Sign up*/}
              {/*  </Link>*/}
              {/*}*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}