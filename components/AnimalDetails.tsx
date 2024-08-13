"use client";

import Button from "@/components/ui/Button";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import NewPost from "@/components/NewPost";
import { ISessionUser, PostDataInterface } from "@/utils/interfaces";
import { deleteAnimal } from "@/lib/actions";
import { deleteImage } from "@/utils/helpers";
import PortalProvider from "@/components/ui/PortalProvider";
import { useSession } from "next-auth/react";

interface AnimalDetailsProps {
  data: PostDataInterface;
}

const AnimalDetails = ({ data }: AnimalDetailsProps) => {
  const [imageIsOpened, setImageIsOpened] = useState<boolean>(false);
  const [editIsOpened, setEditIsOpened] = useState<boolean>(false);

  const session = useSession();
  const sessionUser = session?.data?.user as ISessionUser;

  const handleModalOpen = (): void => {
    setImageIsOpened(true);
    document.body.style.overflow = "hidden";
  };

  const handleModalClose = (): void => {
    setImageIsOpened(false);
    document.body.style.overflow = "";
  };

  const handleEditOpen = (): void => {
    setEditIsOpened(true);
    document.body.style.overflow = "hidden";
  };

  const handleEditClose = (): void => {
    setEditIsOpened(false);
    document.body.style.overflow = "";
  };

  async function deleteHandler() {
    const proceed = window.confirm(
      "Are you sure that you want to delete the post?"
    );

    if (data.imageName) {
      await deleteImage(data.imageName);
    }
    if (proceed && data.id) {
      await deleteAnimal(data.id);
    }
  }

  return (
    <div className="flex flex-col items-center w-[960px] min-h-[576px] border-[1px] border-gray-400 rounded-[10px] p-[5px] bg-neutral-100 max-lg:w-[610px] max-sm:w-[360px]">
      <h2 className="y-4 font-bold w-[90%] text-center max-lg:w-[95%]">
        {data.title}
      </h2>
      <time className="w-[90%] text-[0.8rem]">{data.date}</time>
      <div className="flex justify-center w-[90%] rounded-[10px] bg-white">
        <img
          className="max-w-[90%] max-h-[50vh] object-contain"
          src={data.imageLink ? data.imageLink : "/pets-default.jpg"}
          alt={data.animalType}
          onClick={handleModalOpen}
        />
      </div>
      <p className="w-[90%] mt-8 overflow-auto text-justify">{data.text}</p>
      <p className="w-[90%] mt-8 text-justify">Contacts: {data.contacts}</p>

      {session?.status === "authenticated" &&
        data.userId === sessionUser.id && (
          <div className="flex gap-[50px] mb-4 mt-4">
            <Button
              className="button yellow"
              type="button"
              handleClick={handleEditOpen}
            >
              Edit
            </Button>
            <Button
              className="button purple"
              type="button"
              handleClick={deleteHandler}
            >
              Delete
            </Button>
          </div>
        )}

      {imageIsOpened && (
        <PortalProvider root="modal">
          <Modal modalClose={handleModalClose}>
            <img
              className=" bg-neutral-100 max-w-[85vw] max-h-[80vh] object-contain rounded-[10px]"
              src={data.imageLink ? data.imageLink : "/pets-default.jpg"}
              alt={data.animalType}
              onClick={handleModalOpen}
            />
          </Modal>
        </PortalProvider>
      )}

      {editIsOpened && (
        <PortalProvider root="modal">
          <Modal modalClose={handleEditClose}>
            <NewPost modalClose={handleEditClose} postData={data} />
          </Modal>
        </PortalProvider>
      )}
    </div>
  );
};

export default AnimalDetails;
