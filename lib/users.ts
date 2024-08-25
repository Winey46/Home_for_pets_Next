import { User } from "@/models/user.model";

export async function createUser(user) {
  try {
    const newUser = await User.create(user);
  } catch (error) {
    throw new Error(error.message || "Could not create user");
  }
}
