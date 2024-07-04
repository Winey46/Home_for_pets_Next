'use client';

import React, {useContext} from "react";
import Modal from "@/components/Modal";
import {ModalContext} from "@/store/ModalContext";
import NewPost from "@/components/NewPost";

const ModalWindow: React.FC = () => {
  const {modalState, dataType, modalData} = useContext(ModalContext)

  return (
    <>
      {modalState &&
        <Modal className="modal-window">
          {dataType === 'post' &&
            <NewPost />}
          {dataType === 'image' &&
            <img
              className="animal-details__image"
              src={modalData}
              alt="animal_image"
            />}
        </Modal>}
    </>
  )
}

export default ModalWindow;