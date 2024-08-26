import UserProfileContent from "@/components/UserProfileContent";
import { getAllAnimals } from "@/lib/animals";
import { Suspense } from "react";
import { IPostData, ISessionUser } from "@/utils/interfaces";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

async function UserProfile() {
  const animals: IPostData[] = await getAllAnimals();

  const session = await getServerSession(authOptions);
  const sessionUser = session?.user as ISessionUser;

  return <UserProfileContent animals={animals} sessionUser={sessionUser} />;
}

export default function UserProfilePage() {
  return (
    <Suspense>
      <UserProfile />
    </Suspense>
  );
}
