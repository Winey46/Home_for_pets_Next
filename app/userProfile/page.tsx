import UserProfileContent from "@/components/UserProfileContent";
import { getAllAnimals } from "@/lib/animals";
import { Suspense } from "react";
import { IPostData, ISessionUser } from "@/utils/interfaces";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

async function UserProfile() {
  const animals: IPostData[] = await getAllAnimals();

  const session = await getServerSession(authOptions);
  const sessionUser = session?.user as any;

  const filteredAnimals = animals.filter(
    (animal) => animal.userId === sessionUser?.id
  );

  return <UserProfileContent animals={filteredAnimals} sessionUser={sessionUser} />;
}

export default function UserProfilePage() {
  return (
    <Suspense>
      <UserProfile />
    </Suspense>
  );
}
