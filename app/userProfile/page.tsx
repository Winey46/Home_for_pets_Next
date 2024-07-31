import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export default async function UserProfilePage() {
  const session = await getServerSession(authOptions)

  return (
    <div>
      <h1>Profile of {session?.user?.name}</h1>
    </div>
  )
}