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
        <div id="root">
          <Header />
          <main className="main__wrapper">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
