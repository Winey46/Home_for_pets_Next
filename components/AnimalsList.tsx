'use client';

import AnimalCart from "@/components/AnimalCart";
import { useSearchParams } from "next/navigation";
import { PostDataInterface, IPostPreview, ISessionUser } from "@/utils/interfaces";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface AnimalsListProps {
  animals: { [key: string]: PostDataInterface; }
}

const AnimalsList = ({ animals }: AnimalsListProps) => {
  const [pets, setPets] = useState<IPostPreview[]>([])

  const session = useSession()
  const sessionUser = session?.data?.user as ISessionUser
  
  const params = useSearchParams()
  const postQuery = params.getAll('type')
  const myPostsQuery = params.get('myposts')

  useEffect(() => {
    const temporaryPets: IPostPreview[] = []

    for (let key in animals) {
      temporaryPets.push({
        id: key,
        title: animals[key].title,
        animalType: animals[key].animalType,
        imageLink: animals[key].imageLink,
        userId: animals[key].userId
      })
    }
    temporaryPets.reverse()

    if (!postQuery.length && !myPostsQuery) {
      setPets(temporaryPets)
    }

    if (postQuery.length) {
      setPets(prevState => prevState.filter(animal =>
        animal.animalType.toLowerCase() === postQuery[0] ||
        animal.animalType.toLowerCase() === postQuery[1] ||
        animal.animalType.toLowerCase() === postQuery[2]
      ))
    }

    if (myPostsQuery) {
      setPets(prevState => prevState.filter(animal => animal.userId === sessionUser?.id))
    }

  }, [animals, sessionUser]);

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