import Navigation from "@/components/Navigation";
import React from "react";

const SignUpLayout = ({children}: { children: React.ReactNode }) => {

  return (
    <>
      <Navigation />
      {children}
    </>
  )
}

export default SignUpLayout;