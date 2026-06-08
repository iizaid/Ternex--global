"use client";

import { useEffect, useState } from "react";

const navLinks = ["Home", "Products", "About", "Contact"];

// Clean TERNEX wordmark — serif, no image dependency
function TernexLogo() {
  return (
    <svg
      viewBox="0 0 190 40"
      aria-label="TERNEX"
      className="navbar-logo-svg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y="30"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="26"
        fontWeight="700"
        letterSpacing="5"
        fill="#141a20"
      >
        TERNEX
      </text>
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className={`navbar-wrapper ${scrolled ? "scrolled" : ""}`}>
        <nav className="navbar" aria-label="Primary navigation">
          <a className="brand" href="#home" aria-label="TERNEX home" onClick={closeMenu}>
            <TernexLogo />
          </a>

          {/* Desktop nav links */}
          <div className="nav-links">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="nav-link-item">
                {link}
                <span className="nav-link-underline" />
              </a>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="nav-auth">
            <a className="nav-btn nav-btn-login" href="#login">Log In</a>
            <a className="nav-btn nav-btn-signup" href="#signup">Sign Up</a>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className={`hamburger ${menuOpen ? "hamburger--open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="hamburger__bar" />
            <span className="hamburger__bar" />
            <span className="hamburger__bar" />
          </button>
        </nav>
      </div>

      {/* Mobile drawer */}
      <div
        className={`mobile-drawer ${menuOpen ? "mobile-drawer--open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-drawer__inner">
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="mobile-nav__link"
                onClick={closeMenu}
              >
                {link}
              </a>
            ))}
          </nav>
          <div className="mobile-nav__actions">
            <a className="nav-btn nav-btn-login mobile-nav__btn-login" href="#login" onClick={closeMenu}>
              Log In
            </a>
            <a className="nav-btn nav-btn-signup mobile-nav__btn-signup" href="#signup" onClick={closeMenu}>
              Sign Up
            </a>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-drawer__backdrop" onClick={closeMenu} aria-hidden="true" />
      )}
    </>
  );
}
