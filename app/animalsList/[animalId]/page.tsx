import "@/styles/animalDetails.scss"
import {AnimatePresence} from "framer-motion";
import Button from "@/components/Button";
import {useContext, useState} from "react";
import {ModalContext} from "@/store/ModalContext";
import Modal from "@/components/Modal";
// import DefaultImage from "../../public/pets-default.jpg"

const AnimalDetailsPage =  ()=> {
  // const {handleModalOpen} = useContext(ModalContext)
  // const [modalState, setModalState] = useState(false)
  //
  // const showModalHandler = () => {
  //   setModalState(true)
  //   document.body.style.overflow = 'hidden'
  // }
  //
  // const closeModalHandler = () => {
  //   setModalState(false)
  //   document.body.style.overflow = ''
  // }
  //
  // const startDeleteHandler = () => {
  //   const proceed = window.confirm(
  //     'Are you sure you want to delete the post?')
  //
  //   if (proceed) {
  //     submit(null, {method: 'delete'})
  //   }
  // }
  //
  // if (isSubmitting) {
  //   return <div className="spinner"></div>
  // }

  return (
    <div className="animal-details__wrapper">
      AnimalDetailsPage
      {/*<h2 className="animal-details__title">{data.title}</h2>*/}
      {/*<time className="animal-details__date">{data.date}</time>*/}
      {/*{!modalState &&*/}
      {/*  <div className="image-wrapper">*/}
      {/*    <img*/}
      {/*      className="animal-details__image"*/}
      {/*      src={data.image.name.length > 0 ? data.image.link : DefaultImage}*/}
      {/*      alt={data.animalType}*/}
      {/*      onClick={showModalHandler}*/}
      {/*    />*/}
      {/*  </div>}*/}
      {/*<AnimatePresence>*/}
      {/*  {modalState &&*/}
      {/*    <Modal*/}
      {/*      className="modal-window"*/}
      {/*      onClose={closeModalHandler}*/}
      {/*      root={document.querySelector('#modal')}*/}
      {/*      variants={{*/}
      {/*        hidden: {opacity: 0, y: 200},*/}
      {/*        visible: {opacity: 1, y: 0}*/}
      {/*      }}*/}
      {/*      initial="hidden"*/}
      {/*      animate="visible"*/}
      {/*      exit="hidden"*/}
      {/*    >*/}
      {/*      <img*/}
      {/*        className="animal-details__image"*/}
      {/*        src={data.image.name.length > 0 ? data.image.link : DefaultImage}*/}
      {/*        alt={data.animalType}*/}
      {/*        onClick={showModalHandler}*/}
      {/*      />*/}
      {/*    </Modal>}*/}
      {/*</AnimatePresence>*/}
      {/*<p className="animal-details__text">{data.text}</p>*/}
      {/*<p className="animal-details__contacts">Contacts: {data.contacts}</p>*/}
      {/*<div className="buttons-wrapper">*/}
      {/*  <Button*/}
      {/*    className="button yellow"*/}
      {/*    type="button"*/}
      {/*    onClick={() => handleModalOpen(data, 'post', 'put')}*/}
      {/*    disabled={isSubmitting}*/}
      {/*  >{isSubmitting ? 'Submitting...' : 'Edit'}</Button>*/}
      {/*  <Button*/}
      {/*    className="button purple"*/}
      {/*    type="button"*/}
      {/*    onClick={startDeleteHandler}*/}
      {/*    disabled={isSubmitting}*/}
      {/*  >{isSubmitting ? 'Deleting...' : 'Delete'}</Button>*/}
      {/*</div>*/}
    </div>
  )
}

export default AnimalDetailsPage;