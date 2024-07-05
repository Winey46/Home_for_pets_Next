// 'use client';

import React from "react";
import Button from "@/components/ui/Button";

const MainPageNavigation: React.FC = () => {
  return (
    <nav id="home-navigation" className="home-navigation">
      <Button
        className="home-navigation__link"
        scrollTo="about"
      >About</Button>
      <Button
        className="home-navigation__link"
        scrollTo="contacts"
      >Contacts</Button>

      {/*<span*/}
      {/*  className="home-navigation__link"*/}
      {/*  onClick={aboutHandler}*/}
      {/*>About</span>*/}
      {/*<span*/}
      {/*  className="home-navigation__link"*/}
      {/*  onClick={contactsHandler}*/}
      {/*>Contacts</span>*/}
    </nav>
  )
}

export default MainPageNavigation;