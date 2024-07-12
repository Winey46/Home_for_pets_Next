import Navigation from "@/components/Navigation";
import React from "react";

const AnimalsLayout = ({children}: { children: React.ReactNode }) => {

  return (
    <>
      <Navigation />
      {children}
    </>
  )
}

export default AnimalsLayout;