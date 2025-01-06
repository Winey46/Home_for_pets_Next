import UserProfileContent from "@/components/UserProfileContent";

import { IPostData } from "@/utils/interfaces";
import { getServerSession } from "next-auth";
import { getAnimalsByUserId } from "@/lib/animals";
import { authOptions } from "@/lib/auth-options";

async function UserProfile() {
  const session = await getServerSession(authOptions);
  const sessionUser = session?.user as any;

  return <UserProfileContent sessionUser={sessionUser} />;
}

export default function UserProfilePage() {
  return <UserProfile />;
}
