import bcrypt from "bcrypt";
import {dbConnect} from "@/lib/database";
import {createUser} from "@/lib/users";

export const POST = async (req) => {
  const {name, email, password} = await req.json()

  // Create a DB Connection
  await dbConnect()

  // Encrypt the password
  const hashedPassword = await bcrypt.hash(password, 5)

  // Form a DB payload
  const newUser = {
    name,
    password: hashedPassword,
    email
  }

  // Update the DB
  try {
    await createUser(newUser)

  } catch (error) {
    return new Error(error.message || 'Failed to create user')
  }

  return new Response('User has been created', {status: 201})
}