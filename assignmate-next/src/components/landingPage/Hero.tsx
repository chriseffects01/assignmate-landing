"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingScreen from "../shared/LoadingScreen";

function Hero() {
  const router = useRouter();
  const [showloader, setShowLoader] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  function handleGetStarted() {
    setShowLoader(true);
    setIsClosing(false);

    setTimeout(() => {
      setIsClosing(true);
    }, 900);

    setTimeout(() => {
      router.push("/auth/login");
    }, 1200);
  }

  return (
    <>
      {showloader && (
        <LoadingScreen
          message="Prepaing user authentication..."
          isClosing={isClosing}
        />
      )}
      <section className="hero">
        <p className="hero-tagline">Smarter assignments, zero stress</p>
        <h1 className="hero-title"> AssignMate</h1>
        <p className="hero-subtitle">Your Assignment Studio</p>
        <p className="hero-text">
          Create assignments faster, cleaner, and easier.
        </p>
        <button
          type="button"
          onClick={handleGetStarted}
          className="hero-button"
        >
          Get started &rarr;
        </button>
        <a href="#features" className="hero-link">
          See how it works
        </a>
      </section>
    </>
  );
}

export default Hero;
