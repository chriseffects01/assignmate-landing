"use client";
import { useEffect } from "react";

import Hero from "../components/Hero";
import HowITWorks from "../components/HowItWorks";
import Features from "../components/Features";
import Cta from "../components/Cta";

export default function Home() {
  useEffect(() => {
    const sections = document.querySelectorAll(".section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.7 },
    );
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Hero />
      <HowITWorks />
      <Features />
      <Cta />
    </>
  );
}
