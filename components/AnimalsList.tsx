"use client";

import AnimalCart from "@/components/AnimalCart";
import { useSearchParams } from "next/navigation";
import { IPostData, ISessionUser } from "@/utils/interfaces";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface AnimalsListProps {
  animals: IPostData[];
}

const AnimalsList = ({ animals }: AnimalsListProps) => {
  const [filteredAnimals, setFilteredAnimals] = useState<IPostData[]>(animals);

  const session = useSession();
  const sessionUser = session?.data?.user as ISessionUser;

  const params = useSearchParams();
  const postQuery = params.getAll("type");
  const myPostsQuery = params.get("myposts");

  useEffect(() => {
    setFilteredAnimals(animals);

    if (postQuery.length) {
      setFilteredAnimals((prevState) =>
        prevState.filter(
          (animal) =>
            animal.animalType.toLowerCase() === postQuery[0] ||
            animal.animalType.toLowerCase() === postQuery[1] ||
            animal.animalType.toLowerCase() === postQuery[2]
        )
      );
    }

    if (myPostsQuery) {
      setFilteredAnimals((prevState) =>
        prevState.filter((animal) => animal.userId === sessionUser?.id)
      );
    }
  }, [animals, sessionUser]);

  if (!animals.length) {
    return (
      <p className="max-w-[910px] w-full flex justify-center items-center text-2xl h-[500px] text-center px-[7px]">
        There are no available pets.
      </p>
    );
  }

  return (
    <div className="max-w-[910px] flex justify-center max-xl:w-full">
      <ul className="flex flex-wrap gap-[5px]">
        {filteredAnimals.map((animal) => (
          <AnimalCart
            key={animal._id.toString()}
            to={`/animalsList/${animal._id.toString()}`}
            imgSrc={animal.imageLink}
            title={animal.title}
          />
        ))}
      </ul>
    </div>
  );
};

export default AnimalsList;
