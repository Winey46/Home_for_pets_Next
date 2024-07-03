import "@/styles/homePage.scss"
import MainPageNavigation from "@/components/MainPageNavigation";
import Heading from "@/components/Heading";
import About from "@/components/About";
import Contacts from "@/components/Contacts";
import React from "react";

export default function HomePage() {
  return (
    <div className="home__wrapper">
      <MainPageNavigation />
      <Heading />
      <About />
      <Contacts />
    </div>
  )
}