import Filters from "@/components/Filters";
import AnimalsList from "@/components/AnimalsList";
import { getAllAnimals, getAnimalsPage, getPagesCount } from "@/lib/animals";
import { Suspense } from "react";
import Pagination from "@/components/ui/Pagination";

const AnimalsListPage = async () => {
  // const animals = await getAllAnimals();

  // const animalsPage = await getAnimalsPage();

  const pages = Number(await getPagesCount());

  return (
    <div className="flex flex-col items-center gap-[5px] w-full min-h-[576px]">
      <Filters />
      {/* <Suspense> */}
        {/* <AnimalsList animals={animalsPage} /> */}
        <AnimalsList />
      {/* </Suspense> */}
      <Suspense>
        <Pagination pages={pages} />
      </Suspense>
    </div>
  );
};

export default AnimalsListPage;