'use client';

import "@/styles/header.scss"
import React, {useContext, useState} from "react";
import {openArrow} from "@/utils/symbols";
import {AnimatePresence, motion} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {ModalContext} from "@/store/ModalContext";
import Button from "./Button";

const MainNavigation = () => {
  const [navigationState, setNavigationState] = useState<boolean>(false)
  const {modalOpen} = useContext(ModalContext)

  const toggleNavigation = (): void => {
    setNavigationState(prevState => !prevState)
  }

  const scale: {} = {
    initial: {scale: 1},
    animate: {scale: 1.1}
  }

  return (
    <header id="header" className="header">
      <div className="header-raw-wrapper">
        <div className="raw-content">
          <div className="logo-wrapper" onClick={toggleNavigation}>
            <Image
              src="/pets-logo.png"
              alt="pets_logo"
              className="header-logo"
              width={50}
              height={50}
            />
            <span className="header-logo__text">Home for Pets</span>
            <AnimatePresence>
              <motion.span
                className="logo-arrow"
                animate={{rotate: navigationState ? 0 : 180}}
              >{openArrow}</motion.span>
            </AnimatePresence>
          </div>
          <div className="buttons-wrapper">
            <Button
              className="button yellow"
              handleClick={() => modalOpen(null, 'post')}
              variants={scale}
              initial="initial"
              whileHover="animate"
              transition={{type: 'spring', stiffness: 500}}
            >
              Add Post+
            </Button>
            {/*<div className="account-enter__wrapper">*/}
            {/*  <Button*/}
            {/*    className="button purple sign-in"*/}
            {/*    onClick={() => onOpen(null, 'sign-in')}*/}
            {/*  >*/}
            {/*    Sign in*/}
            {/*  </Button>*/}
            {/*  <Link*/}
            {/*    to="/signUp"*/}
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
          <nav className="navigation">
            <motion.ul
              className="navigation-list"
              initial={{y: -76}}
              animate={{y: 0}}
              exit={{y: -76}}
              transition={{type: 'just', duration: 0.5}}
            >
              <li>
                <Link
                  className='navigation-active'
                  href="/"
                >
                  Main
                </Link>
              </li>
              <li>
                <Link
                  className='navigation-active'
                  href="/animalsList"
                >
                  Looking for home
                </Link>
              </li>
              <li>
                <Link
                  className='navigation-active'
                  href="/information"
                >
                  Information
                </Link>
              </li>
            </motion.ul>
          </nav>}
      </AnimatePresence>

    </header>
  )
}

export default MainNavigation;