import type {Metadata} from "next";
import "./globals.scss";
import React from "react";
import MainNavigation from "@/components/MainNavigation";
import {ModalProvider} from "@/store/ModalContext";
import Footer from "@/components/Footer";
import ModalWindow from "@/components/ModalWindow";

export const metadata: Metadata = {
  title: "Searching pets service.",
  description: "We are searching pets service",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
    <body>
    <ModalProvider>
      <ModalWindow />
      <MainNavigation />
      <main className="main__wrapper">
        {children}
      </main>
      <Footer />
    </ModalProvider>
    </body>
    </html>
  );
}
