"use client";

import React from "react";

function HowITWorks() {
  return (
    <main>
      <section
        id="problem"
        className="section section-scroll section-alternate"
      >
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

      <section
        id="features"
        className="section section-scroll section-alternate-reverse"
      >
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

      <section className="section section-scroll section-alternate">
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

      <section className="section section-scroll section-alternate-reverse">
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
    </main>
  );
}

export default HowITWorks;
