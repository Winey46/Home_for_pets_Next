'use client';

import React, {createContext, ReactNode, useState} from "react";

interface ModalContextType {
  dataType: string;
  modalState: boolean;
  modalData: null | {};
  formMethod: string;
  modalOpen: () => void;
  modalClose: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [modalState, setModalState] = useState<boolean>(false)
  const [modalData, setModalData] = useState<null | {}>(null)
  const [formMethod, setFormMethod] = useState<string>('')
  const [dataType, setDataType] = useState<string>('')

  const handleModalOpen = (data= null, dataType = 'post', formMethod = 'post') => {
    setDataType(dataType)
    setModalState(true)
    setModalData(data)
    setFormMethod(formMethod)

    document.body.style.overflow = 'hidden'
  }

  const handleModalClose = (): void => {
    setModalState(false)
    document.body.style.overflow = ''
  }

  const ctxValue: ModalContextType = {
    dataType,
    modalState,
    modalData,
    formMethod,
    modalOpen: handleModalOpen,
    modalClose: handleModalClose,
  }

  return <ModalContext.Provider value={ctxValue}>
    {children}
  </ModalContext.Provider>
}