'use client';

import {usePathname} from "next/navigation";
import Link from "next/link";

const NavLink = ({href}) => {
  const path = usePathname()

  const index = path.indexOf('/', 1)

  let link0, link1, link2

  switch (path) {
    case "/animalsList":
      link0 = 'Home'
      link1 = 'Animals'
      break
    // case `/animalsList/${animalId}`:
    //   link1 = 'Animals'
    //   link2 = 'Animals details'
    //   break
    case "/information":
      link1 = 'Information'
      break
    case "/signUp":
      link1 = 'Sign up'
      break
  }

  return (
    <Link
      href={href}
      className={index === -1 && href === '/' ? 'navigation-not-active' :
        (index === -1 && href === '/animalsList' ? 'navigation-active' : 'navigation-not-active')
      }
    >
      {href === '/' && link0}
      {href === '/animalsList' && link1}
      {/*{href === '/animalsList' && link2}*/}
    </Link>
  )
}

export default NavLink;