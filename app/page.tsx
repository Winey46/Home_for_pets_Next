import MainPageNavigation from "@/components/MainPageNavigation";
import Heading from "@/components/Heading";
import About from "@/components/About";
import Contacts from "@/components/Contacts";
import React from "react";

export default function HomePage() {
  return (
    <>
      <MainPageNavigation />
      <Heading />
      <About />
      <Contacts />
    </>
  )
}