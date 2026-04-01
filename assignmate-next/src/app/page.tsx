"use client";
import { useEffect } from "react";

import Hero from "@/src/components/landingPage/Hero";
import HowITWorks from "@/src/components/landingPage/HowItWorks";
import Features from "@/src/components/landingPage/Features";
import Cta from "@/src/components/landingPage/Cta";

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
      { threshold: 0.1 },
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
