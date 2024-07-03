'use client';

import MainNavigation from "@/components/MainNavigation";
import Footer from "../components/Footer.jsx";
import Link from "next/link";

const ErrorPage = ({error, reset}) => {

  let errorText;

  if (error.status === 404) {
    errorText = "Could not find the page. Please type a valid path";
  }

  console.error(error)

  return (
    <>
    {/*<MainNavigation />*/}
    {/*<main className="main__wrapper">*/}
    <h1 className="error-status">An error occurred!</h1>
    <p className="error-text">{errorText ? errorText : error.statusText}.</p>
    <Link href="/" className="button yellow">Home page</Link>
    {/*</main>*/}
   {/*<Footer />*/}
</>
)
}

export default ErrorPage;