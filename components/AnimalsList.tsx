'use client';

import AnimalCart from "@/components/AnimalCart";
import {useSearchParams} from "next/navigation";
import {PostDataType} from "@/utils/types";
import {useEffect, useState} from "react";

interface AnimalsListProps {
  animals: { [key: string]: PostDataType; }
}

const AnimalsList = ({animals}: AnimalsListProps) => {
  const [pets, setPets] = useState<PostDataType[]>([])

  const params = useSearchParams()
  const postQuery = params.getAll('type')

  useEffect(() => {
    const temporaryPets: PostDataType[] = []

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

  return (
    <div className="w-[924px] flex justify-center px-[7px] max-lg:w-[610px] max-sm:w-[360px]">
      <ul className="flex flex-wrap gap-[5px] w-[910px] max-sm:w-[360px]">
        {pets.map(animal => (
            <AnimalCart
              key={animal.id}
              to={`/animalsList/${animal.id}`}
              imgSrc={animal.imageLink}
              title={animal.title}
            />
          )
        )}
      </ul>
    </div>
  )
}

export default AnimalsList;