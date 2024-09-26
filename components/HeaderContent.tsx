"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { openArrow } from "@/utils/symbols";
import { signOut, useSession } from "next-auth/react";
import Button from "@/components/ui/Button";

interface HeaderContentProps {
  toggleNavigation: () => void;
  navigation: boolean;
  modalOpen: () => void;
  signInOpen: () => void;
}

export default function HeaderContent({
  toggleNavigation,
  navigation,
  modalOpen,
  signInOpen,
}: HeaderContentProps) {
  const { data, status } = useSession();
  const sessionUser = data?.user as any;

  return (
    <div className="flex justify-center w-full h-[75px] border-b-[1px] border-b-gray-600 bg-[#f2f2f2] z-[6]">
      <div className="flex justify-between items-center max-w-[1024px] w-full px-[2%]">
        <div
          className="flex items-center justify-center gap-[5px] text-[1.25rem] hover:cursor-pointer hover:text-[#fbc43c]"
          data-testid="header-logo"
          onClick={toggleNavigation}
        >
          <Image
            className="h-[30px] w-auto"
            src="/pets-logo.png"
            alt="pets_logo"
            width={35}
            height={35}
          />
          <span className="max-lg:hidden">Home for Pets</span>
          <motion.span
            className="flex items-center justify-center"
            animate={{ rotate: navigation ? 0 : 180 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            {openArrow}
          </motion.span>
        </div>
        <div className="flex items-center gap-[75px]">
          {status === "authenticated" && (
            <Button
              className="button yellow"
              handleClick={modalOpen}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Add Post+
            </Button>
          )}

          <div className="flex items-center gap-[10px]">
            {data ? (
              <>
                <Link className="flex items-center" href="/userProfile">
                  <Image
                    className="rounded-[50%] aspect-square object-cover hover:border-[2px] hover:border-[#fbc43c]"
                    src={
                      sessionUser?.image?.imageLink
                        ? sessionUser.image.imageLink
                        : "/avatar-logo.png"
                    }
                    alt="user_photo"
                    width={50}
                    height={50}
                  />
                </Link>
                <Link
                  className="hover:text-[#fbc43c]"
                  href="#"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Link>
              </>
            ) : (
              <Button
                className="button purple px-[1rem] py-[0.5rem]"
                handleClick={signInOpen}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Sign in
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
