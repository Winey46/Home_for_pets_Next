"use client";

import React from "react";
import Link from "next/link";

const ErrorPage = ({ error }) => {
  return (
    <>
      <h1 className="error-status">An error occurred!</h1>
      <p className="error-text">
        {error.message ? error.message : "Something went wrong."}.
      </p>
      <Link href="/" className="button yellow">
        Home page
      </Link>
    </>
  );
};

export default ErrorPage;
