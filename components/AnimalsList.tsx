'use client';

import AnimalCart from "@/components/AnimalCart";
import { useSearchParams } from "next/navigation";
import { PostDataInterface, PostPreviewInterface } from "@/utils/interfaces";
import { useEffect, useState } from "react";

interface AnimalsListProps {
  animals: { [key: string]: PostDataInterface; }
}

const AnimalsList = ({ animals }: AnimalsListProps) => {
  const [pets, setPets] = useState<PostPreviewInterface[]>([])

  const params = useSearchParams()
  const postQuery = params.getAll('type')

  useEffect(() => {
    const temporaryPets: PostPreviewInterface[] = []

    for (let key in animals) {
      temporaryPets.push({
        id: key,
        title: animals[key].title,
        animalType: animals[key].animalType,
        imageLink: animals[key].imageLink,
      })
    }
    temporaryPets.reverse()

    if (postQuery.length > 0) {
      const filteredPets = temporaryPets.filter(animal =>
        animal.animalType.toLowerCase() === postQuery[0] ||
        animal.animalType.toLowerCase() === postQuery[1] ||
        animal.animalType.toLowerCase() === postQuery[2])

      setPets(filteredPets)
    } else {
      setPets(temporaryPets)
    }
  }, [animals]);

  if (!pets.length) {
    return <p className="w-[910px] flex justify-center items-center text-2xl h-[500px] text-center px-[7px] max-lg:w-[610px] max-sm:w-[360px]">
      There are no available pets.
    </p>
  }

  return (
    <div className="max-w-[910px] flex justify-center max-xl:w-full">
      <ul className="flex flex-wrap gap-[5px]">
        {pets.map(animal => (
          <AnimalCart
            key={animal.id}
            to={`/animalsList/${animal.id}`}
            imgSrc={animal.imageLink}
            title={animal.title}
          />
        ))}
      </ul>
    </div>
  )
}

export default AnimalsList;