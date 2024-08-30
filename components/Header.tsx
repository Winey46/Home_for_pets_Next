"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Modal from "@/components/ui/Modal";
import NewPost from "@/components/NewPost";
import MainNavigation from "@/components/MainNavigation";
import PortalProvider from "@/components/ui/PortalProvider";
import SignIn from "@/components/SignIn";
import HeaderContent from "@/components/HeaderContent";

const Header = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [navigationState, setNavigationState] = useState<boolean>(false);
  const [signInState, setSignInState] = useState<boolean>(false);

  const toggleNavigation = (): void => {
    setNavigationState((prevState) => !prevState);
  };

  const handleModalOpen = (): void => {
    setIsOpened(true);
    document.body.style.overflow = "hidden";
  };

  const handleModalClose = (): void => {
    setIsOpened(false);
    document.body.style.overflow = "";
  };

  const handleSignInOpen = (): void => {
    setSignInState(true);
    document.body.style.overflow = "hidden";
  };

  const handleSignInClose = (): void => {
    setSignInState(false);
    document.body.style.overflow = "";
  };

  return (
    <header
      id="header"
      className="flex flex-col items-center w-full bg-[#f2f2f2] shadow-lg"
    >
      <HeaderContent
        toggleNavigation={toggleNavigation}
        navigation={navigationState}
        modalOpen={handleModalOpen}
        signInOpen={handleSignInOpen}
      />

      <AnimatePresence>{navigationState && <MainNavigation />}</AnimatePresence>

      {isOpened && (
        <PortalProvider root="modal">
          <Modal
            className="flex items-center justify-center bg-neutral-100 fixed top-[7vh] max-w-[86vw] max-h-[86vh] rounded-[10px] shadow-lg overflow-y-auto p-[10px] z-10 max-lg:max-h-[76vh] max-sm:max-h-[72vh]"
            modalClose={handleModalClose}
            backdrop
          >
            <NewPost modalClose={handleModalClose} />
          </Modal>
        </PortalProvider>
      )}

      {signInState && (
        <PortalProvider root="modal">
          <Modal
            className="flex items-center justify-center bg-neutral-100 fixed top-[7vh] max-w-[86vw] max-h-[86vh] rounded-[10px] shadow-lg overflow-y-auto p-[10px] z-10 max-lg:max-h-[76vh] max-sm:max-h-[72vh]"
            modalClose={handleSignInClose}
            backdrop
          >
            <SignIn signInClose={handleSignInClose} />
          </Modal>
        </PortalProvider>
      )}
    </header>
  );
};

export default Header;
