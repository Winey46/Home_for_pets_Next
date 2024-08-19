'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface AnimalCartProps {
  to: string;
  imgSrc?: string | null;
  title: string;
}

export default function AnimalCart({ to, imgSrc, title }: AnimalCartProps) {
  const [postTitleHover, setPostTitleHover] = useState<boolean>(false)

  return (
    <li className="w-[300px] h-[300px] hover:cursor-pointer max-lg:w-[198px] max-lg:h-[198px] max-sm:w-[170px] max-sm:h-[170]">
      <Link
        href={to}
        className="h-full w-full"
        onMouseEnter={() => setPostTitleHover(true)}
        onMouseLeave={() => setPostTitleHover(false)}
      >
        <div className="flex flex-col justify-center h-full w-full rounded-[5px]">
          <Image
            className="w-full h-full object-cover rounded-[5px]"
            src={imgSrc ? imgSrc : '/pets-default.jpg'}
            alt="animal_image"
            width={300}
            height={300}
          />
        </div>
        <AnimatePresence>
          {postTitleHover &&
            <div
              className="relative bottom-[101px] w-full h-[100px] flex flex-col items-center justify-center bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.75))] rounded-br-[5px] rounded-bl-[5px] overflow-hidden">
              <motion.p
                className="text-center m-0 w-[90%] text-neutral-100"
                variants={{
                  hidden: { x: -500 },
                  visible: { x: 0 }
                }}
                transition={{ duration: 0.3, delay: 0.1 }}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >{title}</motion.p>
            </div>
          }
        </AnimatePresence>
      </Link>
    </li>
  )
}