"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";
// import { useNavigate } from "react-router-dom";
import LoadingScreen from "../shared/LoadingScreen";

function Cta() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();

  function handleCTA() {
    setIsLoading(true);

    setTimeout(() => {
      window.location.href = "/auth";
    }, 1250);
  }
  return (
    <>
      {isLoading && (
        <LoadingScreen message="Preparing User Authentication..." />
      )}
      <section className="final-cta ">
        <h2>Build better assignments</h2>
        <p>
          Start creating assignments faster, smarter, and stress-free today.
        </p>
        <button onClick={handleCTA} type="button" className="cta-button ">
          Get Started
        </button>
      </section>
    </>
  );
}

export default Cta;
