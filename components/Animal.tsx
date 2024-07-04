'use client';

import Button from "@/components/Button";
import {useContext} from "react";
import {ModalContext} from "@/store/ModalContext";

const AnimalDetails = ({data}) => {
  const {modalOpen, modalClose} = useContext(ModalContext)

  const openImageHandler = () => {
    modalOpen(data.image.name.length > 0 ? data.image.link : '/pets-default.jpg', 'image')
  }

  return (
    <div className="animal-details__wrapper">
      <h2 className="animal-details__title">{data.title}</h2>
      <time className="animal-details__date">{data.date}</time>
      <div className="image-wrapper">
        <img
          className="animal-details__image"
          src={data.image.name.length > 0 ? data.image.link : '/pets-default.jpg'}
          alt={data.animalType}
          onClick={openImageHandler}
        />
      </div>
      <p className="animal-details__text">{data.text}</p>
      <p className="animal-details__contacts">Contacts: {data.contacts}</p>
      <div className="buttons-wrapper">
        <Button
          className="button yellow"
          type="button"
          onClick={() => modalOpen(data, 'post', 'put')}
        >Edit</Button>
        <Button
          className="button purple"
          type="button"
          // onClick={startDeleteHandler}
        >Delete</Button>
      </div>
    </div>
  )
}

export default AnimalDetails;