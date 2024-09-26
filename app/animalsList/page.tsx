import Filters from "@/components/Filters";
import AnimalsList from "@/components/AnimalsList";
import { getPagesCount } from "@/lib/animals";
import { Suspense } from "react";
import Pagination from "@/components/ui/Pagination";

const AnimalsListPage = async () => {
  const pages = Number(await getPagesCount());

  return (
    <div className="flex flex-col items-center gap-[5px] w-full min-h-[582px]">
      <Filters />
      <AnimalsList />
      <Suspense>
        <Pagination pages={pages} />
      </Suspense>
    </div>
  );
};

export default AnimalsListPage;
