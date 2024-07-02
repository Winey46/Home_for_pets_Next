import "@/styles/homePage.scss"
import MainPageNavigation from "@/components/MainPageNavigation.jsx";
import Heading from "@/components/Heading.jsx";
import About from "@/components/About.jsx";
import Contacts from "@/components/Contacts.jsx";
import React from "react";

export default function HomePage(): React.JSX.Element {
  return (
    <div className="home__wrapper">
      <MainPageNavigation />
      <Heading />
      <About />
      <Contacts />
    </div>
  )
}