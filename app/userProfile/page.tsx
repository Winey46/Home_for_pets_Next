import UserProfileContent from "@/components/UserProfileContent";
import { getAllAnimals } from "@/lib/animals";
import { Suspense } from "react";
import { IPostData } from "@/utils/interfaces";

async function UserProfile() {
  const animals: IPostData[] = await getAllAnimals();

  return <UserProfileContent animals={animals} />;
}

export default function UserProfilePage() {
  return (
    <Suspense>
      <UserProfile />
    </Suspense>
  );
}
