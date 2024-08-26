import NextAuth from "next-auth";
import GoggleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { dbConnect } from "@/lib/database";
import { User } from "@/models/user.model";
import bcrypt from "bcrypt";
import type { NextAuthOptions, User as NextAuthUser } from "next-auth";
import process from "node:process";
import { createUser } from "@/lib/users";

interface IUser {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  password?: string;
  image?: string;
}

interface IUpdatedUser {
  email: string;
  name: string;
  picture: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoggleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "email and password",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          await dbConnect();

          const currentUser = (await User.findOne({
            email: credentials.email,
          })) as IUser;

          if (!currentUser) {
            return null;
          }

          const match = await bcrypt.compare(
            credentials.password,
            currentUser?.password
          );

          if (currentUser && match) {
            const userWithoutPassword = {
              id: currentUser._id.toString(),
              email: currentUser.email,
              name: currentUser.name,
              image: currentUser.image,
            };

            return userWithoutPassword as NextAuthUser;
          }
        } catch (error) {
          console.error("User doesn't exist");
          console.error(error);
          return null;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = (await User.findOne({
        email: session.user.email,
      })) as IUser;

      const updatedUser = { id: sessionUser.id, ...session.user };
      session.user = updatedUser;

      return session;
    },
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        try {
          await dbConnect();

          const userExists = (await User.findOne({
            email: profile.email,
          })) as IUser;

          if (!userExists) {
            const updatedUser = { ...profile } as IUpdatedUser;

            await createUser({
              email: updatedUser.email,
              name: updatedUser.name,
              image: updatedUser.picture,
            });
          }

          return true;
        } catch (error) {
          console.log("Error checking if user exists: ", error.message);

          return false;
        }
      }

      if (account.provider === "credentials") return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
