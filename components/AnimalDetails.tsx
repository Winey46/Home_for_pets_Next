'use client';

import Button from "@/components/ui/Button";
import {useState} from "react";
import Modal from "@/components/ui/Modal";
import NewPost from "@/components/NewPost";
import {PostDataInterface} from "@/utils/interfaces";
import {deleteAnimal} from "@/lib/actions";
import {deleteImage} from "@/utils/helpers";
import {useRouter} from "next/navigation";


interface AnimalDetailsProps {
  data: PostDataInterface
}

const AnimalDetails = ({data}: AnimalDetailsProps) => {
  const [imageIsOpened, setImageIsOpened] = useState<boolean>(false)
  const [editIsOpened, setEditIsOpened] = useState<boolean>(false)

  const handleModalOpen = (): void => {
    setImageIsOpened(true)
    document.body.style.overflow = 'hidden'
  }

  const handleModalClose = (): void => {
    setImageIsOpened(false)
    document.body.style.overflow = ''
  }

  const handleEditOpen = (): void => {
    setEditIsOpened(true)
    document.body.style.overflow = 'hidden'
  }

  const handleEditClose = (): void => {
    setEditIsOpened(false)
    document.body.style.overflow = ''
  }

  function deleteHandler() {
    const proceed = window.confirm(
      'Are you sure that you want to delete the post?')

    if (data.imageName) {
      deleteImage(data.imageName)
    }
    if (proceed && data.id) {
      deleteAnimal(data.id).then(() => console.log('Animal deleted.'))
    }
  }

  return (
    <div className="flex flex-col items-center w-[960px] min-h-[576px] border-[1px] border-gray-400 rounded-[10px] p-[5px] bg-neutral-100 max-lg:w-[610px] max-sm:w-[360px]">
      <h2 className="mb-4 mt-4 font-bold w-full text-center max-lg:w-[95%]">{data.title}</h2>
      <time className="w-[90%] text-[0.8rem]">{data.date}</time>
      <div className="flex justify-center w-[90%] rounded-[10px]">
        <img
          className="max-w-[90%] max-h-[50vh] object-contain rounded-[10px]"
          src={data.imageLink ? data.imageLink : '/pets-default.jpg'}
          alt={data.animalType}
          onClick={handleModalOpen}
        />
      </div>
      <p className="w-[90%]">{data.text}</p>
      <p className="w-[90%]">Contacts: {data.contacts}</p>
      <div className="flex gap-[50px] mb-4 mt-4">
        <Button
          className="button yellow"
          type="button"
          handleClick={handleEditOpen}
        >Edit</Button>
        <Button
          className="button purple"
          type="button"
          handleClick={deleteHandler}
        >Delete</Button>
      </div>

      {imageIsOpened &&
        <Modal modalClose={handleModalClose} root='modal'>
          <img
            className=" bg-neutral-100 max-w-[85vw] max-h-[80vh] object-contain rounded-[10px]"
            src={data.imageLink ? data.imageLink : '/pets-default.jpg'}
            alt={data.animalType}
            onClick={handleModalOpen}
          />
        </Modal>
      }
      {editIsOpened &&
        <Modal modalClose={handleEditClose} root='modal'>
          <NewPost modalClose={handleEditClose} postData={data} />
        </Modal>
      }
    </div>
  )
}

export default AnimalDetails;