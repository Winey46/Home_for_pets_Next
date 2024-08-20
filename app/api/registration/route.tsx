import bcrypt from "bcrypt";
import { dbConnect } from "@/lib/database";
import { createUser } from "@/lib/users";

export const POST = async (request) => {
  const { name, email, password } = await request.json();

  if (
    name.trim().length < 2 ||
    !email.trim().includes("@") ||
    (password.trim().length < 3 && !/[A-Z]/.test(password.trim()))
  ) {
    return new Response("Input validation error", {
      status: 400,
    });
  }

  await dbConnect();

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = {
    name,
    password: hashedPassword,
    email,
  };

  try {
    await createUser(newUser);
  } catch (error) {
    return new Response("Failed to create user", { status: 500 });
  }

  return new Response("User has been created", { status: 201 });
};
