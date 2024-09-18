import "./globals.scss";
import type { Metadata } from "next";
import React from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Searching pets service.",
  description: "We are searching pets.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div id="modal" className="flex justify-center items-center"></div>
          <div id="root">
            <Header />
            <main className="flex flex-col items-center w-full max-w-[1024px] min-h-[656px] mb-[5px]">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
