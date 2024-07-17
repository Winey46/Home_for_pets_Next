import Link from "next/link";
import Image from "next/image";
import React from "react";

const Footer: React.FC = function Footer() {
  return (
    <footer
      id="footer"
      className="w-full flex items-center justify-evenly bg-zinc-700 min-h-[175px] shadow-lg mt-[10px] max-md:flex-col"
    >
      <Link
        className="flex items-center justify-center gap-[5px] text-[1.25rem] text-neutral-100 hover:text-[#fbc43c]"
        href="/"
      >
        <Image
          src="/pets-logo.png"
          alt="pets_logo"
          className="h-[30px] w-auto"
          width={50}
          height={50}
        />
        <span className="text-neutral-200 hover:text-[#fbc43c]">Home for Pets</span>
      </Link>
      <p className="text-neutral-200">
        © 2024 Creative Web Production.
        <br />Home for Pets. All rights reserved.
      </p>
      <a
        className="text-neutral-200 hover:text-[#fbc43c]"
        href="mailto:home4pets46@gmail.com"
      >
        home4pets46@gmail.com
      </a>
    </footer>
  )
}

export default Footer;