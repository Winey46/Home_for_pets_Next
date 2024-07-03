import "@/styles/animalsList.scss";
import Filters from "@/components/Filters";
import AnimalsList from "@/components/AnimalsList";
import {getAllAnimals} from "@/lib/animals";
import {Suspense} from "react";

const Animals = async () => {
  const animals = await getAllAnimals()

  return <AnimalsList animals={animals} />
}

const AnimalsListPage = () => {
  return (
    <div className="animals-list__wrapper">
      <Filters
        // filtersHandle={filtersHandle}
        // filtersReset={filtersReset}
        // typeValue={postQuery}
      />
      <Suspense>
        <Animals />
      </Suspense>
    </div>
  )
}

export default AnimalsListPage;