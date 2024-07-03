'use client';

import React, {useContext} from "react";
import Modal from "@/components/Modal";
import {ModalContext} from "@/store/ModalContext";
import NewPost from "@/components/NewPost";

const ModalWindow: React.FC = () => {
  const {modalState, dataType} = useContext(ModalContext)

  return (
    <>
      {modalState &&
        <Modal>
          {dataType === 'post' &&
            <NewPost />}
        </Modal>}
    </>
  )
}

export default ModalWindow;