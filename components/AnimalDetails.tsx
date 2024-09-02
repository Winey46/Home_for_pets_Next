"use client";

import Button from "@/components/ui/Button";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import NewPost from "@/components/NewPost";
import { ISessionUser, IPostData } from "@/utils/interfaces";
import { deleteAnimal } from "@/lib/animals";
import { deleteImage } from "@/utils/helpers";
import PortalProvider from "@/components/ui/PortalProvider";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface AnimalDetailsProps {
  data: IPostData;
}

const AnimalDetails = ({ data }: AnimalDetailsProps) => {
  const [imageIsOpened, setImageIsOpened] = useState<boolean>(false);
  const [editIsOpened, setEditIsOpened] = useState<boolean>(false);

  const router = useRouter();

  const session = useSession();
  const sessionUser = session?.data?.user as any;

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
    if (proceed && data._id) {
      await deleteAnimal(data._id);
      router.push("/animalsList");
    }
  }

  return (
    <div className="flex flex-col items-center w-full min-h-[576px] border-[1px] border-gray-400 rounded-[10px] p-[5px] bg-neutral-100">
      <h2 className="y-4 font-bold w-[90%] text-center max-lg:w-[95%]">
        {data.title}
      </h2>
      <time className="w-full px-[5%] text-[0.8rem]">{data.date}</time>
      <div className="flex justify-center w-[90%] rounded-[10px] bg-white">
        <Image
          className="w-full px-[5%] max-h-[50vh] object-contain"
          src={data.imageLink ? data.imageLink : "/pets-default.jpg"}
          alt={data.animalType}
          onClick={handleModalOpen}
          width={1024}
          height={1024}
        />
      </div>
      <p className="w-full px-[5%] mt-8 overflow-auto text-justify">
        {data.text}
      </p>
      <p className="w-full px-[5%] mt-8 text-justify">
        Contacts: {data.contacts}
      </p>

      {session?.status === "authenticated" &&
        data.userId === sessionUser.id && (
          <div className="flex gap-[50px] mb-4 mt-4">
            <Button
              className="button yellow"
              type="button"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              handleClick={handleEditOpen}
            >
              Edit
            </Button>
            <Button
              className="button purple"
              type="button"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              handleClick={deleteHandler}
            >
              Delete
            </Button>
          </div>
        )}

      {imageIsOpened && (
        <PortalProvider root="modal">
          <Modal
            modalClose={handleModalClose}
            className="flex items-center justify-center bg-neutral-100 fixed top-[7vh] max-w-[86vw] max-h-[86vh] rounded-[10px] shadow-lg overflow-y-auto p-[10px] z-10 max-lg:max-h-[76vh] max-sm:max-h-[72vh]"
            backdrop
          >
            <Image
              className=" bg-neutral-100 max-w-[85vw] max-h-[80vh] object-contain rounded-[10px]"
              src={data.imageLink ? data.imageLink : "/pets-default.jpg"}
              alt={data.animalType}
              width={1024}
              height={1024}
              onClick={handleModalOpen}
            />
          </Modal>
        </PortalProvider>
      )}

      {editIsOpened && (
        <PortalProvider root="modal">
          <Modal
            modalClose={handleEditClose}
            className="flex items-center justify-center bg-neutral-100 fixed top-[7vh] max-w-[86vw] max-h-[86vh] rounded-[10px] shadow-lg overflow-y-auto p-[10px] z-10 max-lg:max-h-[76vh] max-sm:max-h-[72vh]"
            backdrop
          >
            <NewPost modalClose={handleEditClose} postData={data} />
          </Modal>
        </PortalProvider>
      )}
    </div>
  );
};

export default AnimalDetails;
