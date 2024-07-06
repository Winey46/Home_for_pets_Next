import MainPageNavigation from "@/components/MainPageNavigation";
import Heading from "@/components/Heading";
import About from "@/components/About";
import Contacts from "@/components/Contacts";
import React from "react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center w-[960px] max-md:w-[610px] max-sm:w-[360px]">
      <MainPageNavigation />
      <Heading />
      <About />
      <Contacts />
    </div>
  )
}