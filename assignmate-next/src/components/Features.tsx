import React from "react";

function Features() {
  const featureList = [
    {
      icon: "📝",
      title: "Generate Ideas",
      text: "Instantly get headings and pointers for your assignment.",
    },
    {
      icon: "⚡",
      title: "Fast Workflow",
      text: "Create assignments quicker and stress-free.",
    },
    {
      icon: "🖋️",
      title: "Edit Freely",
      text: "Customize each section exactly how you want it.",
    },
    {
      icon: "📄",
      title: "Export PDF",
      text: "Clean, polished PDFs ready for submission.",
    },
  ];

  return (
    <section className="features-strip section">
      {featureList.map((feature, i) => (
        <div className="feature-card" key={i}>
          <div className="feature-icon">{feature.icon}</div>
          <h3>{feature.title}</h3>
          <p>{feature.text}</p>
        </div>
      ))}
    </section>
  );
}

export default Features;
