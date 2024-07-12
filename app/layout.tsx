import type {Metadata} from "next";
import "./globals.scss";
import React from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Searching pets service.",
  description: "We are searching pets.",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
    <body>
      <div id="modal" className="flex justify-center"></div>
      <div id="root">
        <Header />
        <main className="flex flex-col items-center max-md:w-[610px] max-sm:w-[360px] min-height">
          {children}
        </main>
        <Footer />
      </div>
    </body>
    </html>
  );
}
