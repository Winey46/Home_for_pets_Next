import '@/styles/footer.scss'
import Link from "next/link";
import Image from "next/image";
import React from "react";

const Footer: React.FC = function Footer() {
  return (
    <footer id="footer" className="footer">
      <Link
        className="footer-logo__wrapper"
        href="/"
      >
        <Image
          src="/pets-logo.png"
          alt="pets_logo"
          className="footer-logo"
          width={50}
          height={50}
        />
        <span className="footer-logo__text">Home for Pets</span>
      </Link>
      <p className="footer-text">
        © 2024 Creative Web Production.
        <br />Home for Pets. All rights reserved.
      </p>
      <a
        className="footer-contacts"
        href="mailto:home4pets46@gmail.com"
      >
        home4pets46@gmail.com
      </a>
    </footer>
  )
}

export default Footer;