'use client';

import {motion} from "framer-motion";
import React from "react";

const Modal: React.FC = ({children, modalClose}) => {
  return (
    <>
      <div
        className="fixed flex justify-end items-start top-0 left-0 w-full h-full bg-transparent-[0.5] bg-black bg-opacity-50 z-[9] "
        onClick={modalClose}
      >
        <p className="py-[5px] px-[50px] text-neutral-100 text-[1.2rem] hover:cursor-pointer">Close</p>
      </div>
      <motion.dialog
        open
        className="bg-neutral-100 fixed top-[7vh] max-w-[86vw] max-h-[86vh] rounded-[10px] shadow-lg overflow-y-auto p-[10px] z-10 max-md:max-h-[76vh] max-sm:max-h-[72vh]"
        initial={{opacity: 0, y: 200}}
        animate={{opacity: 1, y: 0}}
        exit={{opacity: 0, y: 200}}
      >
        <div className="flex items-center justify-center h-full w-full">
          {children}
        </div>
      </motion.dialog>
    </>
  )
}

export default Modal