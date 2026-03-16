import React, { useEffect } from "react";

function App() {
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
    <main>
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

      <section id="problem" className="section section-alternate">
        <div className="section-text">
          <h2>Why AssignMate?</h2>
          <p>
            Students spend hours struggling with assignments. AssignMate makes
            it faster, cleaner, and smarter. Get your assignments done while
            learning, without the stress.
          </p>
        </div>

        <div className="section-image section-left">
          <div className="image-placeholder"> Image goes here</div>
        </div>
      </section>
      <section id="features" className="section section-alternate-reverse">
        <div className="section-text">
          <h2>Features You'll love</h2>
          <p>
            Generate assignments, expand ideas, edit freely, and export as clean
            PDFs. AssignMate keeps your workflow smooth and stress-free
          </p>
        </div>
        <div className="section-image section-right">
          <div className="image-placeholder">Feature Image</div>
        </div>
      </section>
      <section className="section section-alternate">
        <div className="section-text">
          <h2>Section Heading</h2>
          <p>
            From prompt to PDF.
            <br />
            Structure. Write. Edit. Submit.
          </p>
        </div>
        <div className="section-image section-left">
          <div className="image-placeholder">Image Placeholder</div>
        </div>
      </section>
      <section className="section section-alternate-reverse">
        <div className="section-text">
          <h2>Build Better Assignments in Minutes</h2>
          <p>
            AssignMate helps you structure, write, editand export your
            assignments <br /> effortlessly &mdash; so you can focus on
            learning, not stress
          </p>
        </div>
        <div className="section-image section-right">
          <div className="image-placeholder">Image Placeholder</div>
        </div>
      </section>

      <section className="features-strip">
        <div className="feature-card">
          <div className="feature-icon">📝</div>
          <h3>Generate Ideas</h3>
          <p>Instantly get headings and pointers for your assignment.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Fast Workflow</h3>
          <p>Create assignments quicker and stress-free.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🖋️</div>
          <h3>Edit Freely</h3>
          <p>Customize each section exactly how you want it.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📄</div>
          <h3>Export PDF</h3>
          <p>Clean, polished PDFs ready for submission.</p>
        </div>
      </section>

      <section className="final-cta">
        <h2>Ready to simplify your Assignments?</h2>
        <p>
          Start creating assignments faster, smarter, and stress-free today.
        </p>
        <h2>Build better assignments</h2>
        <button className="cta-button">Get Started</button>
      </section>
    </main>
  );
}

export default App;
