'use client';

import { shortArrow } from "@/utils/symbols";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const path = usePathname()

  return (
    <nav id="navigation" className="flex my-[25px] w-full px-[5%] max-w-[1024px] max-lg:my-[15px] max-lg:justify-center">
      <ul className="flex items-center gap-[10px] ">
        <li>
          <Link href="/" className="hover:text-[#fbc43c]">Home</Link>
        </li>
        {shortArrow}
        <li>
          <Link
            href={path.startsWith("/animalsList") ? "/animalsList" :
              path === "/signUp" ? "/signUp" :
              path === "/userProfile" ? "/userProfile" :
                "/information"}
            className={path === "/animalsList" || path === "/information" || path === "/signUp" || path === "/userProfile" ?
              "text-[#833de7] hover:text-[#fbc43c]" : "hover:text-[#fbc43c]"}
          >
            {path.startsWith("/animalsList") ? "Animals" :
              path === "/signUp" ? "SignUp" :
              path === "/userProfile" ? "Profile" :
                "Information"}
          </Link>
        </li>
        {path.startsWith("/animalsList") && path.length > 12 && shortArrow}

        {path.startsWith("/animalsList") && path.length > 12 &&
          <li>
            <p
              className={path.startsWith("/animalsList") && path.length > 12 ?
                "text-[#833de7] hover:text-[#fbc43c] hover:cursor-pointer" :
                "hover:text-[#fbc43c] hover:cursor-pointer"}
            >
              Animal Details
            </p>
          </li>
        }
      </ul>
    </nav>
  )
}