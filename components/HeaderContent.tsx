"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
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
  const session = useSession();

  const userImage = session?.data?.user?.image;

  return (
    <div className="flex justify-center w-full h-[75px] border-b-[1px] border-b-gray-400">
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
          <AnimatePresence>
            <motion.span
              className="flex items-center justify-center"
              animate={{ rotate: navigation ? 0 : 180 }}
            >
              {openArrow}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-[75px]">
          {session?.status === "authenticated" && (
            <Button className="button yellow" handleClick={modalOpen}>
              Add Post+
            </Button>
          )}

          <div className="flex items-center gap-[10px]">
            {session?.data ? (
              <>
                <Link className="flex items-center" href="/userProfile">
                  <img
                    className="rounded-[50%]"
                    src={userImage ? userImage : "/dog-image.jpg"}
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
