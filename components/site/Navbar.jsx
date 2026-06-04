"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const navLinks = ["Home", "Products", "About", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`navbar-wrapper ${scrolled ? "scrolled" : ""}`}>
      <nav className="navbar" aria-label="Primary navigation">
        <a className="brand" href="#" aria-label="TERNEX home">
          <Image src="/images/ternex-logo.png" alt="TERNEX" width={3382} height={660} priority />
        </a>

        <div className="nav-links">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="nav-link-item">
              {link}
              <span className="nav-link-underline" />
            </a>
          ))}
        </div>

        <div className="nav-auth">
          <a className="nav-btn nav-btn-login" href="#login">
            Log In
          </a>
          <a className="nav-btn nav-btn-signup" href="#signup">
            Sign Up
          </a>
        </div>
      </nav>
    </div>
  );
}
