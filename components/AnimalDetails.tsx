'use client';

import Button from "@/components/ui/Button";
import {useState} from "react";
import Modal from "@/components/ui/Modal";
import NewPost from "@/components/NewPost";
import {PostDataInterface} from "@/utils/types";
import {deleteAnimal} from "@/lib/actions";
import {deleteImage} from "@/utils/helpers";
import {useRouter} from "next/navigation";


interface AnimalDetailsProps {
  data: PostDataInterface
}

const AnimalDetails = ({data}: AnimalDetailsProps) => {
  const [imageIsOpened, setImageIsOpened] = useState<boolean>(false)
  const [editIsOpened, setEditIsOpened] = useState<boolean>(false)
  const router = useRouter()

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

  function startDeleteHandler() {
    const proceed = window.confirm(
      'Are you sure that you want to delete the post?')

    if (data.imageName) {
      deleteImage(data.imageName)
        .then(() => console.log('deleted'))
    }
    if (proceed && data.id) {
      deleteAnimal(data.id)
        .then(() => router.push('/animalsList'))
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
          className="flex justify-center items-center py-[1rem] px-[1.5rem] rounded-[5px] text-[1rem] bg-amber-400 hover:bg-amber-500 max-md:text-[0.9rem] max-md:py-[0.6rem] max-md:px-[0.8rem]"
          type="button"
          handleClick={handleEditOpen}
        >Edit</Button>
        <Button
          className="flex justify-center items-center py-[1rem] px-[1.5rem] rounded-[5px] text-[1rem] text-neutral-100 bg-purple-600 hover:bg-purple-700 max-md:text-[0.9rem] max-md:py-[0.6rem] max-md:px-[0.8rem]"
          type="button"
          handleClick={startDeleteHandler}
        >Delete</Button>
      </div>

      {imageIsOpened &&
        <Modal modalClose={handleModalClose}>
          <img
            className=" bg-neutral-100 max-w-[85vw] max-h-[80vh] object-contain rounded-[10px]"
            src={data.imageLink ? data.imageLink : '/pets-default.jpg'}
            alt={data.animalType}
            onClick={handleModalOpen}
          />
        </Modal>
      }

      {editIsOpened &&
        <Modal modalClose={handleEditClose}>
          <NewPost modalClose={handleEditClose} postData={data} />
        </Modal>
      }

    </div>
  )
}

export default AnimalDetails;