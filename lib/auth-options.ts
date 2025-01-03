import GoggleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { dbConnect } from "@/lib/database";
import { User } from "@/models/user.model";
import bcrypt from "bcrypt";
import type { NextAuthOptions, User as NextAuthUser } from "next-auth";
import { createUser } from "@/lib/users";

interface IUser {
    _id?: string;
    id?: string;
    name?: string;
    email?: string;
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
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string,
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
  
            const currentUser: IUser | undefined | null = await User.findOne({
              email: credentials.email,
            });
  
            if (!currentUser) {
              return null;
            }
  
            if (currentUser.password) {
              const match = await bcrypt.compare(
                credentials.password,
                currentUser?.password
              );
              
              if (currentUser._id && match) {
                const userWithoutPassword: NextAuthUser = {
                  id: currentUser._id.toString(),
                  email: currentUser.email,
                  name: currentUser.name,
                  image: currentUser.image,
                };
    
                return userWithoutPassword;
              }
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
          email: session?.user?.email,
        })) as IUser;
  
        const updatedUser = { id: sessionUser.id, ...session.user };
        session.user = updatedUser;
  
        return session;
      },
      jwt({ token, trigger, session }) {
        if (trigger === "update" && session?.name) {
          token.name = session.name;
          token.email = session.email;
          token.picture = session.image;
        }
        return token;
      },
      async signIn(params): Promise<boolean | string> {
        if (params.account?.provider === "google") {
          try {
            await dbConnect();
  
            const userExists: IUpdatedUser | null | undefined =
              await User.findOne({
                email: params.profile?.email,
              });
  
            if (!userExists) {
              await createUser({
                email: params.user.email,
                name: params.user.name,
                image: {
                  imageName: params.user.image,
                  imageLink: params.user.image,
                },
              });
            }
  
            return true;
          } catch (error: any) {
            console.log("Error checking if user exists: ", error?.message);
  
            return false;
          }
        }
  
        if (params.account?.provider === "credentials") return true;
  
        return "/";
      },
    },
  };