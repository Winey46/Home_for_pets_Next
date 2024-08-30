"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ModalProps {
  className: string;
  modalClose?: () => void;
  children?: ReactNode;
  backdrop?: boolean;
}

const Modal = ({ className, children, modalClose, backdrop }: ModalProps) => {
  return (
    <>
      {backdrop && (
        <div
          className="fixed flex justify-end items-start top-0 left-0 w-full h-full bg-transparent-[0.5] bg-black z-[9] bg-opacity-50"
          onClick={modalClose}
        >
          <p className="py-[5px] px-[50px] text-neutral-100 text-[1.2rem] hover:cursor-pointer">
            Close
          </p>
        </div>
      )}
      <motion.div
        className={`${className} z-10`}
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 200 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default Modal;
