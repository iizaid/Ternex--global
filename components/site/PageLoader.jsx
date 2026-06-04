"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  // phase: "visible" → "sliding" → "gone"
  const [phase, setPhase] = useState("visible");

  useEffect(() => {
    // After 1.8s show the slide-up animation
    const slideTimer = setTimeout(() => setPhase("sliding"), 1800);
    // Remove from DOM after the slide finishes (0.7s transition)
    const removeTimer = setTimeout(() => setPhase("gone"), 2500);
    return () => {
      clearTimeout(slideTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div className={`page-loader${phase === "sliding" ? " page-loader--up" : ""}`} aria-hidden="true">
      <div className="loader">
        <div className="loading-text">
          Loading<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
        </div>
        <div className="loading-bar-background">
          <div className="loading-bar">
            <div className="white-bars-container">
              <div className="white-bar"></div>
              <div className="white-bar"></div>
              <div className="white-bar"></div>
              <div className="white-bar"></div>
              <div className="white-bar"></div>
              <div className="white-bar"></div>
              <div className="white-bar"></div>
              <div className="white-bar"></div>
              <div className="white-bar"></div>
              <div className="white-bar"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
