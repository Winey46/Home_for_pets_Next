'use client';

import React, {useState} from "react";
import {openArrow} from "@/utils/symbols";
import {AnimatePresence, motion} from "framer-motion";
import Image from "next/image";
import Button from "./ui/Button";
import Modal from "@/components/ui/Modal";
import NewPost from "@/components/NewPost";
import MainNavigation from "@/components/MainNavigation";
import PortalProvider from "@/components/ui/PortalProvider";
import Link from "next/link";
import SignIn from "@/components/SignIn";
import HeaderContent from "@/components/HeaderContent";

const Header = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const [navigationState, setNavigationState] = useState<boolean>(false)
  const [signInState, setSignInState] = useState<boolean>(false)

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

  const handleSignInOpen = (): void => {
    setSignInState(true)
    document.body.style.overflow = 'hidden'
  }

  const handleSignInClose = (): void => {
    setSignInState(false)
    document.body.style.overflow = ''
  }

  return (
    <header id="header" className="flex flex-col items-center w-full">
      <HeaderContent
        toggleNavigation={toggleNavigation}
        navigation={navigationState}
        modalOpen={handleModalOpen}
        signInOpen={handleSignInOpen}
      />

      <AnimatePresence>
        {navigationState && <MainNavigation/>}
      </AnimatePresence>

      {isOpened &&
        <PortalProvider root='modal'>
          <Modal modalClose={handleModalClose}>
            <NewPost modalClose={handleModalClose}/>
          </Modal>
        </PortalProvider>
      }

      {signInState &&
        <PortalProvider root='modal'>
          <Modal modalClose={handleSignInClose}>
            <SignIn signInClose={handleSignInClose}/>
          </Modal>
        </PortalProvider>
      }
    </header>
  )
}

export default Header;