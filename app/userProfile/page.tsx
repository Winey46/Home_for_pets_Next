import UserProfileContent from "@/components/UserProfileContent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

// async function UserProfile() {
//   const session = await getServerSession(authOptions);
//   const sessionUser = session?.user as any;
// console.log(session)
//   return <UserProfileContent sessionUser={sessionUser} />;
// }

export default function UserProfilePage() {
  // return <UserProfile />;
  return <UserProfileContent />;
}
