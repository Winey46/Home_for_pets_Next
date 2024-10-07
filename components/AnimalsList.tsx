"use client";

import AnimalCart from "@/components/AnimalCart";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IPostData } from "@/utils/interfaces";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getAnimalsPage } from "@/lib/animals";
import React from "react";

const AnimalsList = () => {
  const [filteredAnimals, setFilteredAnimals] = useState<
    IPostData[] | undefined
  >();

  const session = useSession();
  const sessionUser = session?.data?.user as any;

  const { replace } = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const postQuery = searchParams.getAll("type");
  const myPostsQuery = searchParams.get("myposts");
  const sortQuery = searchParams.get("sortbydate");
  const page = searchParams.get("page");

  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["animals-page", page, sortQuery],
    queryFn: () => getAnimalsPage({ page, sortQuery }),
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (!params.has("sortbydate")) params.set("sortbydate", "new");
    if (!params.has("page")) params.set("page", "1");

    replace(`${pathname}?${params.toString()}`);

    if (isSuccess && !isError && data) {
      setFilteredAnimals((prevState) => data);

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
    }
  }, [data, isSuccess, sortQuery, myPostsQuery, sessionUser]);

  if (isLoading) {
    return (
      <>
        <div className="spinner"></div>
        <p>Fetching animals...</p>
      </>
    );
  }

  if (isError) {
    console.error(error.message);
    throw new Error("Failed to fetch page with animals");
  }

  if (isSuccess && !isError && !data.length) {
    return (
      <p className="w-full min-h-[437px] flex justify-center items-center text-2xl text-center border-[1px] border-gray-600 rounded-[10px] bg-neutral-100">
        There are no available pets.
      </p>
    );
  }

  return (
    <ul className="w-full flex items-start flex-wrap gap-[5px] border-[1px] border-gray-600 rounded-[10px] p-[5px] bg-neutral-100">
      {filteredAnimals &&
        filteredAnimals.map((animal) => (
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
