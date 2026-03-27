import react from "react";

function Hero() {
  return (
    <section className="hero">
      <p className="hero-tagline">Smarter assignments, zero stress</p>
      <h1 className="hero-title"> AssignMate</h1>
      <p className="hero-subtitle">Your Assignment Studio</p>
      <p className="hero-text">
        Create assignments faster, cleaner, and easier.
      </p>
      <button className="hero-button">Get started &rarr;</button>
      <a href="#features" className="hero-link">
        See how it works
      </a>
    </section>
  );
}

export default Hero;
