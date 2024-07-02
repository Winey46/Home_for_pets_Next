'use client';

import React, {Fragment, useContext} from "react";
import Modal from "@/components/Modal";
import {ModalContext} from "@/store/ModalContext";
import NewPost from "@/components/NewPost";

const ModalWindow: React.FC = () => {
  const {modalState, modalClose, dataType, modalData, formMethod} = useContext(ModalContext)

  return (
    <Fragment>
          {modalState &&
            <Modal
              className="modal-window"
              root={document.querySelector('#modal')}
              initial={{opacity: 0, y: 200}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: 200}}
              onClose={modalClose}
            >
              {dataType === 'post' &&
                <NewPost
                  data={modalData}
                  formMethod={formMethod}
                  onClose={modalClose}
                />}
              {/*{dataType === 'sign-in' && <SignIn />}*/}
            </Modal>}
    </Fragment>
  )
}

export default ModalWindow