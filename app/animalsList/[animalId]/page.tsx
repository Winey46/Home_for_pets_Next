import {Suspense} from "react";
import {getAnimal} from "@/lib/animals";
import AnimalDetails from "@/components/AnimalDetails";

const Animal = async ({animalId}: { animalId: string }) => {
  const result = await getAnimal(animalId)
  result.id = animalId

  return <AnimalDetails data={result} />
}

const AnimalDetailsPage = ({params}: { params: { animalId: string } }) => {
  return (
    <Suspense>
      <Animal animalId={params.animalId} />
    </Suspense>
  )
}

export default AnimalDetailsPage;