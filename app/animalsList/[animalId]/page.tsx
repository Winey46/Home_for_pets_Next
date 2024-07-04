import "@/styles/animalDetails.scss"
import {Suspense} from "react";
import {getAnimal} from "@/lib/animals";
import AnimalDetails from "@/components/Animal";

const Animal = async ({animalId}) => {
  const result = await getAnimal(animalId)

  return <AnimalDetails data={result} />
}

const AnimalDetailsPage = ({params}) => {

  // const startDeleteHandler = () => {
  //   const proceed = window.confirm(
  //     'Are you sure you want to delete the post?')
  //
  //   if (proceed) {
  //     submit(null, {method: 'delete'})
  //   }
  // }
  //
  // if (isSubmitting) {
  //   return <div className="spinner"></div>
  // }

  return (
    <Suspense>
      <Animal animalId={params.animalId} />
    </Suspense>
  )
}

export default AnimalDetailsPage;