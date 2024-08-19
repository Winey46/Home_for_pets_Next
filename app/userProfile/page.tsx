import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import AnimalCart from "@/components/AnimalCart";
import { getAllAnimals } from "@/lib/animals";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { ISessionUser } from "@/utils/interfaces";
import Image from "next/image";

export default async function UserProfilePage() {
  const session = await getServerSession(authOptions);

  const animals = await getAllAnimals();
  const sessionUser = session?.user as ISessionUser;

  const filteredPets = animals.filter(
    (animal) => animal.userId === sessionUser?.id
  );

  return (
    <div className="flex flex-col max-w-[1024px] items-center w-[98%] py-[2%] min-h-[576px] border-[1px] border-gray-600 rounded-[10px] bg-neutral-100">
      <div className="flex w-full min-h-[450px] max-w-[910px]">
        {session?.user && (
          <form className="flex flex-col gap-4 w-[70%] items-center px-[5%]">
            <h2 className="text-xl font-[500] mb-6">{session?.user?.name}</h2>
            <Input
              className="input mb-12"
              name="profile_email"
              label="Email *"
              placeholder="Your new password"
              type="text"
              defaultValue={session?.user?.email}
            />
            <Input
              className="input"
              name="profile_password"
              label="Password *"
              placeholder="Your new password"
              type="text"
            />
            <Input
              className="input"
              name="profile_confirm_password"
              label="Password confirmation *"
              placeholder="Confirm your new password"
              type="text"
            />
            <Button className="button purple">Save</Button>
          </form>
        )}
        <div className="flex flex-col items-center w-[30%]">
          <h3 className="text-xl">Avatar:</h3>
          <Image
            className="w-full my-8 rounded-[50%]"
            src="/avatar-logo.png"
            alt="avatar_logo"
            width={256}
            height={256}
          />
          {/* <Input name="avatar-image" type="file" /> */}
        </div>
      </div>
      <h3 className="px-[50px] text-lg font-[500] self-start">My Posts:</h3>
      <ul className="max-w-[920px] w-full flex flex-wrap gap-[5px] bg-white rounded-[10px] px-[5px]">
        {filteredPets.length ? (
          filteredPets.map((animal) => (
            <AnimalCart
              key={animal._id}
              to={`/animalsList/${animal._id}`}
              imgSrc={animal.imageLink}
              title={animal.title}
            />
          ))
        ) : (
          <p className="max-w-[910px] w-full flex justify-center items-center text-2xl h-[310px] text-center px-[2%]">
            There are no available pets.
          </p>
        )}
      </ul>
    </div>
  );
}
