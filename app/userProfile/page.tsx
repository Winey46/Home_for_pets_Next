import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import AnimalCart from "@/components/AnimalCart";
import { getAllAnimals } from "@/lib/animals";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { IPostPreview, ISessionUser } from "@/utils/interfaces";

export default async function UserProfilePage() {
  const session = await getServerSession(authOptions);

  const animals = await getAllAnimals();
  const sessionUser = session?.user as ISessionUser;

  const pets: IPostPreview[] = [];

  for (let key in animals) {
    pets.push({
      id: key,
      title: animals[key].title,
      animalType: animals[key].animalType,
      imageLink: animals[key].imageLink,
      userId: animals[key].userId,
    });
  }

  pets.reverse();

  const filteredPets = pets.filter((pet) => pet.userId === sessionUser?.id);

  return (
    <div className="flex flex-col items-center w-full px-[5%] py-[2%] min-h-[576px] border-[1px] border-gray-600 rounded-[10px] bg-neutral-100">
      {session?.user && (
        <>
          <h2 className="text-xl font-[500]">{session?.user?.name}</h2>
          <p className="self-start">Email: {session?.user?.email}</p>
          <form className="self-start">
            <Input
              className="input"
              name="profile_password"
              label="New Password"
              placeholder="Enter your password"
              type="text"
            />
            <Input
              className="input"
              name="profile_confirm_password"
              label="Confirm Password"
              placeholder="Repeat your password"
              type="text"
            />
            <Button className="button purple">Change password</Button>
          </form>
        </>
      )}
      <h3 className="text-lg font-[500]">My Posts:</h3>
      <ul className="flex flex-wrap gap-[5px]">
        {filteredPets.map((animal) => (
          <AnimalCart
            key={animal.id}
            to={`/animalsList/${animal.id}`}
            imgSrc={animal.imageLink}
            title={animal.title}
          />
        ))}
      </ul>
    </div>
  );
}
