import bcrypt from "bcrypt";
import { dbConnect } from "@/lib/database";
import { createUser } from "@/lib/users";

export const POST = async (request) => {
  const { name, email, password } = await request.json();

  if (name.trim().length < 2) {
    return new Response("Name should contain at least 2 symbols", {
      status: 400,
    });
  }

  if (!email.trim().includes("@") || !email.trim().includes(".")) {
    return new Response("Email should contain '@' and '.' symbols", {
      status: 400,
    });
  }

  if (
    password.trim().length < 6 ||
    !/[A-Z]/.test(password.trim()) ||
    !/[a-z]/.test(password.trim()) ||
    !/\d/.test(password.trim())
  ) {
    return new Response(
      "Should contain at least 6 symbols, upper and lower case symbols and numbers",
      { status: 400 }
    );
  }

  await dbConnect();

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = {
    name,
    password: hashedPassword,
    email,
    image: {
      imageName: null,
      imageLink: null,
    },
  };

  try {
    await createUser(newUser);
  } catch (error) {
    return new Response("Failed to create user", { status: 500 });
  }

  return new Response("User has been created", { status: 201 });
};
