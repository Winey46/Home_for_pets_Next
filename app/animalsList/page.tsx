import Filters from "@/components/Filters";
import AnimalsList from "@/components/AnimalsList";
import Pagination from "@/components/ui/Pagination";

const AnimalsListPage = async () => {
  return (
    <div className="flex flex-col items-center gap-[5px] w-full min-h-[582px]">
      <Filters />
      <AnimalsList />
      <Pagination />
    </div>
  );
};

export default AnimalsListPage;
