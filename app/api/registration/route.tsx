import bcrypt from "bcrypt";
import {dbConnect} from "@/lib/database";
import {createUser} from "@/lib/users";

export const POST = async (req) => {
  const {name, email, password} = await req.json()

  await dbConnect()

  const hashedPassword = await bcrypt.hash(password, 5)

  const newUser = {
    name,
    password: hashedPassword,
    email
  }

  try {
    await createUser(newUser)

  } catch (error) {
    return new Error(error.message || 'Failed to create user')
  }

  return new Response('User has been created', {status: 201})
}