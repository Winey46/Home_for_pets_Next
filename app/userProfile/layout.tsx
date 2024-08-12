import Navigation from "@/components/Navigation";
import React from "react";

const ProfileLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

export default ProfileLayout;
