import Filters from "@/components/Filters";
import AnimalsList from "@/components/AnimalsList";
import { getAllAnimals } from "@/lib/animals";
import { Suspense } from "react";

const AnimalsListPage = async () => {
  const animals = await getAllAnimals();

  return (
    <div className="flex flex-col items-start gap-[5px] w-full min-h-[576px]">
      <Filters />
      <Suspense>
        <AnimalsList animals={animals} />
      </Suspense>
    </div>
  );
};

export default AnimalsListPage;
