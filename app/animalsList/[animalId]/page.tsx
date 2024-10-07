import { Suspense } from "react";
import { getAnimal } from "@/lib/animals";
import AnimalDetails from "@/components/AnimalDetails";

const Animal = async ({ animalId }: { animalId: string }) => {
  const animal = await getAnimal(animalId);

  return <AnimalDetails data={animal} />;
};

const AnimalDetailsPage = ({ params }: { params: { animalId: string } }) => {
  return (
    <Suspense>
      <Animal animalId={params.animalId} />
    </Suspense>
  );
};

export default AnimalDetailsPage;
