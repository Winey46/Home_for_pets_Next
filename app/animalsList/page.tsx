import Filters from "@/components/Filters";
import AnimalsList from "@/components/AnimalsList";
import {getAllAnimals} from "@/lib/animals";
import {Suspense} from "react";

const AnimalsListPage = async () => {
  const animals = await getAllAnimals()

  return (
    <div
      className="flex gap-[5px] w-[1140px] min-h-[576px] border-[1px] border-gray-600 rounded-[10px] p-[5px] bg-neutral-100 max-xl:justify-center max-xl:items-center max-xl:flex-col max-xl:w-[922px] max-lg:w-[617px] max-sm:w-[357px]">
      <Filters/>
      <Suspense>
        <AnimalsList animals={animals}/>
      </Suspense>
    </div>
  );
};

export default AnimalsListPage;
