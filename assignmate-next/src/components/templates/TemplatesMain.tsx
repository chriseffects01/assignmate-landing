"use client";

import { templates } from "@/src/data/templates";
import "@/src/styles/templates/templates.css";
import "@/src/styles/assignments/assignments-main.css";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/src/components/shared/LoadingScreen";
import { useState } from "react";
import { TemplateType } from "@/src/types/assignment";
import { createAssignment } from "@/src/services/assignmentService";
import getAssignmentId from "@/src/lib/getAssignmentId";

type FilterType = "all" | "essay" | "report" | "premium";

export default function TemplatesMain() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleUseTemplate = async (template: TemplateType) => {
    setIsLoading(true);

    // Destructive to remove the IDS and timestamps from the template

    //This keeps all the "content" but throws away the database metadata.

    // const { _id, createdAt, ...templateData } = template;

    try {
      // Passing the "clean" data to creation function

      const newAssignment = await createAssignment(template);

      console.log("New Assignment created:", newAssignment);

      // Redirecting to the new assignments's id

      if (newAssignment && getAssignmentId(newAssignment)) {
        setTimeout(() => {
          //USing the id returned from the server for the new document

          router.push(`/workspace/${getAssignmentId(newAssignment)}`);
        }, 1300);
      }
    } catch (err) {
      console.error("Failed to use template:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTemplates = templates.filter((template) => {
    if (activeFilter === "all") return true;

    if (activeFilter === "premium") {
      return template.premium === true;
    }

    return template.category === activeFilter;
  });

  return (
    <>
      {isLoading && <LoadingScreen message="Loading your workspace..." />}
      <div className="templates-container">
        <div className="templates-header">
          <div className="templates-welcome">
            <p>Marketplace</p>
            <h1>Templates</h1>
            <p>Start quickly with pre-built structures</p>
          </div>
          <div className="templates-action">
            <button className="btn dashboard-primary-btn">Use Template</button>
            <button className="btn dashboard-secondary-btn">
              Create custom
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="templates-search-flex">
          <div className="templates-search">
            <input
              type="text"
              name="template-search"
              className="templates-input"
              placeholder="Search templates..."
            />
          </div>

          {/* Filters */}
          <div className="templates-filters">
            <button
              className={`filter ${activeFilter === "all" ? "active" : ""}`}
              type="button"
              onClick={() => {
                console.log("clicked");
                setActiveFilter("all");
              }}
            >
              All
            </button>

            <button
              className={`filter ${activeFilter === "essay" ? "active" : ""}`}
              type="button"
              onClick={() => setActiveFilter("essay")}
            >
              Essay
            </button>

            <button
              className={`filter ${activeFilter === "report" ? "active" : ""}`}
              type="button"
              onClick={() => setActiveFilter("report")}
            >
              Report
            </button>

            <button
              className={`filter premium ${activeFilter === "premium" ? "active" : ""}`}
              type="button"
              onClick={() => setActiveFilter("premium")}
            >
              Premium
            </button>
          </div>
        </div>

        <div className="assignments-empty-card">
          <p className="assignments">
            Choose a custom template for your cover page or go premium enjoy all
            its benefits
          </p>
        </div>

        <div className="templates-grid">
          {filteredTemplates.map((template) => (
            <div
              key={template._id}
              className="assignment-card"
              onClick={() => handleUseTemplate(template)}
              id={`${template.premium && "template-premium-space"}`}
            >
              <h3 className="template-card-header">{template.title}</h3>
              <p className="template-card-text">{template.description}</p>
              {template.premium && (
                <span className="template-premium">Premium</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
