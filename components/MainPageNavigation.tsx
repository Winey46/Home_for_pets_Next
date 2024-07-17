import React from "react";
import Button from "@/components/ui/Button";

const MainPageNavigation: React.FC = () => {
  return (
    <nav
      id="home-navigation"
      className="self-start my-[25px] flex items-center gap-[30px] max-md:justify-center max-md:items-center max-md:w-[610px] max-md:my-[15px] max-sm:w-[360px]"
    >
      <Button className="hover:cursor-pointer hover:text-[#ffb100]" scrollTo='#about'>
        About
      </Button>
      <Button className="hover:cursor-pointer hover:text-[#ffb100]" scrollTo='#contacts'>
        Contacts
      </Button>
    </nav>
  )
}

export default MainPageNavigation;