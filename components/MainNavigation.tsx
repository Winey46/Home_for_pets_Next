"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function MainNavigation() {
  const path: string = usePathname();

  return (
    <motion.nav
      className="flex justify-center w-full h-[75px] overflow-hidden border-b-[1px] border-b-gray-600 bg-[#f2f2f2] z-[5]"
      initial={{ y: -76 }}
      animate={{ y: 0 }}
      exit={{ y: -76 }}
      transition={{ type: "just", duration: 0.5 }}
    >
      <ul className="flex h-[75px] max-w-[1024px]  px-[2%] justify-center items-center gap-[100px] max-sm:gap-[30px]">
        <li>
          <Link
            href="/"
            className={
              path === "/"
                ? "text-[#833de7] hover:text-[#fbc43c]"
                : "hover:text-[#fbc43c]"
            }
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/animalsList?sortbydate=new&page=1"
            className={
              path.startsWith("/animalsList")
                ? "text-[#833de7] hover:text-[#fbc43c]"
                : "hover:text-[#fbc43c]"
            }
          >
            Looking for home
          </Link>
        </li>
        <li>
          <Link
            href="/information"
            className={
              path.startsWith("/information")
                ? "text-[#833de7] hover:text-[#fbc43c]"
                : "hover:text-[#fbc43c]"
            }
          >
            Information
          </Link>
        </li>
      </ul>
    </motion.nav>
  );
}
