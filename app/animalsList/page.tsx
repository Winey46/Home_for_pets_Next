import Filters from "@/components/Filters";
import AnimalsList from "@/components/AnimalsList";
import {getAllAnimals} from "@/lib/animals";

const AnimalsListPage = async () => {
  const animals = await getAllAnimals()

  return (
    <div className="flex justify-between w-[1180px] min-h-[576px] border-[1px] border-gray-600 rounded-[10px] p-[5px] bg-neutral-100 max-xl:justify-center max-xl:items-center max-xl:flex-col max-lg:w-[610px] max-sm:w-[360px]">
      <Filters />
      <AnimalsList animals={animals} />
    </div>
  )
}

export default AnimalsListPage;