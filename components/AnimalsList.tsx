"use client";

import AnimalCart from "@/components/AnimalCart";
import { useSearchParams } from "next/navigation";
import { IPostData } from "@/utils/interfaces";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface AnimalsListProps {
  animals: IPostData[];
}

const AnimalsList = ({ animals }: AnimalsListProps) => {
  const [filteredAnimals, setFilteredAnimals] = useState<IPostData[]>(animals);

  const session = useSession();
  const sessionUser = session?.data?.user as any;

  const params = useSearchParams();
  const postQuery = params.getAll("type");
  const myPostsQuery = params.get("myposts");
  const sortQuery = params.get("sortbydate");

  useEffect(() => {
    if (sortQuery === "new") setFilteredAnimals(animals);
    else setFilteredAnimals([...animals].reverse());

    if (postQuery.length)
      setFilteredAnimals((prevState) =>
        prevState.filter(
          (animal) =>
            animal.animalType.toLowerCase() === postQuery[0] ||
            animal.animalType.toLowerCase() === postQuery[1] ||
            animal.animalType.toLowerCase() === postQuery[2]
        )
      );

    if (myPostsQuery) {
      setFilteredAnimals((prevState) =>
        prevState.filter((animal) => animal.userId === sessionUser?.id)
      );
    }
  }, [sortQuery, myPostsQuery, sessionUser]);

  if (!animals.length) {
    return (
      <p className="w-full min-h-[487px] flex justify-center items-center text-2xl text-center border-[1px] border-gray-600 rounded-[10px] bg-neutral-100">
        There are no available pets.
      </p>
    );
  }

  return (
    <ul className="w-full min-h-[487px] flex flex-wrap gap-[5px] border-[1px] border-gray-600 rounded-[10px] p-[5px] bg-neutral-100">
      {filteredAnimals.map((animal) => (
        <AnimalCart
          key={animal._id.toString()}
          to={`/animalsList/${animal._id.toString()}`}
          imgSrc={animal.image.imageLink}
          title={animal.title}
        />
      ))}
    </ul>
  );
};

export default AnimalsList;
