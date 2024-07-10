'use client';

import React, {useState} from "react";
import {openArrow} from "@/utils/symbols";
import {AnimatePresence, motion} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Button from "./ui/Button";
import {usePathname} from "next/navigation";
import Modal from "@/components/ui/Modal";
import NewPost from "@/components/NewPost";

const Header = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const [navigationState, setNavigationState] = useState<boolean>(false)

  const path: string = usePathname()

  const toggleNavigation = (): void => {
    setNavigationState(prevState => !prevState)
  }

  const handleModalOpen = (): void => {
    setIsOpened(true)
    document.body.style.overflow = 'hidden'
  }

  const handleModalClose = (): void => {
    setIsOpened(false)
    document.body.style.overflow = ''
  }

  return (
    <header id="header" className="flex flex-col items-center w-full">
      <div className="flex justify-center w-full h-[75px] border-[1px] border-b-gray-400 shadow-lg bg-neutral-100 max-md:gap-[25] max-md:px-[5%]">
        <div className="flex w-[960px] max-md:w-[610px] max-sm:w-[360px]">
          <div
            className="flex items-center justify-center gap-[5px] text-[1.25rem] hover:cursor-pointer hover:text-amber-300"
            onClick={toggleNavigation}
          >
            <Image
              src="/pets-logo.png"
              alt="pets_logo"
              className="h-[30px] w-auto"
              width={35}
              height={35}
            />
            <span className="max-md:hidden">Home for Pets</span>
            <AnimatePresence>
              <motion.span
                className="flex items-center justify-center"
                animate={{rotate: navigationState ? 0 : 180}}
              >
                {openArrow}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-[75px] ml-auto">
            <Button
              className="flex justify-center items-center py-4 px-6 rounded-[5px] text-[1rem] bg-amber-400 hover:bg-amber-500 max-md:text-[0.9rem] max-md:py-[0.6rem] max-md:px-[0.8rem]"
              handleClick={handleModalOpen}
            >
              Add Post+
            </Button>
            {/*<div className="flex items-center gap-[25px]">*/}
            {/*  <Button*/}
            {/*    className="button purple px-[1rem] py-[0.5rem]"*/}
            {/*    onClick={() => onOpen(null, 'sign-in')}*/}
            {/*  >*/}
            {/*    Sign in*/}
            {/*  </Button>*/}
            {/*  <Link*/}
            {/*    href="/signUp"*/}
            {/*    className="link"*/}
            {/*  >*/}
            {/*    Sign up*/}
            {/*  </Link>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {navigationState &&
          <nav className="w-full h-[75px] overflow-hidden">
            <motion.ul
              className="flex h-[75px] justify-center items-center gap-[100px] m-0 p-0 border-[1px] border-b-gray-400 bg-neutral-100 max-sm:gap-[30px]"
              initial={{y: -76}}
              animate={{y: 0}}
              exit={{y: -76}}
              transition={{type: 'just', duration: 0.5}}
            >
              <li>
                <Link
                  href="/"
                  className={path === '/' ? 'text-purple-800 hover:text-amber-300' : 'hover:text-amber-300'}
                >
                  Main
                </Link>
              </li>
              <li>
                <Link
                  href="/animalsList"
                  className={path.startsWith('/animalsList') ?
                    'text-purple-800 hover:text-purple-900' :
                    'hover:text-amber-300'}
                >
                  Looking for home
                </Link>
              </li>
              <li>
                <Link
                  href="/information"
                  className={path.startsWith('/information') ?
                    'text-purple-800 hover:text-amber-300' :
                    'hover:text-amber-300'}
                >
                  Information
                </Link>
              </li>
            </motion.ul>
          </nav>}
      </AnimatePresence>

      {isOpened &&
        <Modal modalClose={handleModalClose}>
          <NewPost modalClose={handleModalClose} />
        </Modal>}
    </header>
  )
}

export default Header;