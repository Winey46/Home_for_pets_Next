import AnimalDetails from "@/components/AnimalDetails";

const AnimalDetailsPage = ({ params }: { params: { animalId: string } }) => {
  return <AnimalDetails animalId={params.animalId} />;
};

export default AnimalDetailsPage;
