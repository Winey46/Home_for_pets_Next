'use client';

import {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function AnimalCart({to, src, title}) {
  const [postTitleToggle, setPostTitleToggle] = useState(false)

  return (
    <li className="animals-post">
      <Link
        href={to}
        className="animals-post__preview"
        onMouseEnter={() => setPostTitleToggle(true)}
        onMouseLeave={() => setPostTitleToggle(false)}
      >
        <div className="animals-image__wrapper">
          <img
            className="animals-image"
            src={src}
            alt="animal_image"
            // width={300}
            // height={300}
          />
        </div>
        <AnimatePresence>
          {postTitleToggle &&
            <div className="animals-post__header">
              <motion.p
                className="animals-post__title"
                variants={{
                  hidden: {x: -500},
                  visible: {x: 0}
                }}
                transition={{duration: 0.3, delay: 0.1}}
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