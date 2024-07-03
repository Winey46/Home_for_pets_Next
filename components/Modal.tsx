'use client';

import {motion} from "framer-motion";
import React, {useContext} from "react";
import {ModalContext} from "@/store/ModalContext";

const Modal: React.FC = ({children}) => {
  const {modalClose} = useContext(ModalContext)

  return (
    <>
      <div className="backdrop" onClick={modalClose}>
        <p className="backdrop-close">Close</p>
      </div>
      <motion.dialog
        open
        className="modal-window"
        initial={{opacity: 0, y: 200}}
        animate={{opacity: 1, y: 0}}
        exit={{opacity: 0, y: 200}}
      >
        <div className="modal-content__wrapper">
          {children}
        </div>
      </motion.dialog>
    </>
  )
}

export default Modal