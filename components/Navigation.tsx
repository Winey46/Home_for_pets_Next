'use client';

import {shortArrow} from "@/utils/symbols";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function Navigation() {
  const path = usePathname()

  return (
    <nav
      id="navigation"
      className="flex my-[25px] w-[960px] max-lg:my-[15px] max-lg:justify-center max-lg:w-[610px] max-sm:w-[360px]"
    >
      <ul className="flex items-center gap-[10px] ">
        <li>
          <Link href="/" className="hover:text-amber-300">Home</Link>
        </li>
        {shortArrow}
        <li>
          <Link
            href={path.startsWith("/animalsList") ? "/animalsList" : "/information"}
            className={path === "/animalsList" || path === "/information" ?
              "text-purple-800 hover:text-amber-300" : "hover:text-amber-300"}
          >
            {path.startsWith("/animalsList") ? "Animals" : "Information"}
          </Link>
        </li>
        {path.startsWith("/animalsList") && path.length > 12 && shortArrow}
        <li>
          {path.startsWith("/animalsList") && path.length > 12 &&
            <p
              className={path.startsWith("/animalsList") && path.length > 12 ?
                "text-purple-800 hover:text-amber-300 hover:cursor-pointer" :
                "hover:text-amber-300 hover:cursor-pointer"}
            >
              Animal Details
            </p>}
        </li>
      </ul>
    </nav>
  )
}