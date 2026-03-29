"use client";

import React from "react";

import { useRouter } from "next/navigation";

function Cta() {
  const router = useRouter();
  return (
    <section className="final-cta ">
      <h2>Build better assignments</h2>
      <p>Start creating assignments faster, smarter, and stress-free today.</p>
      <button onClick={() => router.push("/auth")} className="cta-button ">
        Get Started
      </button>
    </section>
  );
}

export default Cta;
