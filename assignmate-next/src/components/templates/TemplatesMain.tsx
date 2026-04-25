"use client";

import { templates } from "@/src/data/templates";
import "@/src/styles/templates/templates.css";
import "@/src/styles/assignments/assignments-main.css";
import { useRouter } from "next/navigation";
import { createAssignmentFromTemplate } from "@/src/lib/createAssignment";
import { addAssignment } from "@/src/lib/assignmentStorage";
import { addAssignmentFromTemplate } from "@/src/lib/assignmentStorage";
import LoadingScreen from "@/src/components/shared/LoadingScreen";

import { useState } from "react";

type FilterType = "all" | "essay" | "report" | "premium";

export default function TemplatesMain() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleUseTemplate = (template: any) => {
    setIsLoading(true);

    const newAssignment = createAssignmentFromTemplate(template);
    addAssignmentFromTemplate(newAssignment);

    setTimeout(() => {
      router.push(`/workspace/${newAssignment.id}`);
    }, 1300);
  };

  // const filteredTemplates =
  //   activeFilter === "all"
  //     ? templates
  //     : activeFilter === "essay"
  //       ? templates.filter((template) => template.category === "essay")
  //       : templates.filter((template) => template.category === "lab")
  //         ? templates.filter((template) => template.premium === true)
  //         : templates;

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
            {/* {templateFilter.map((filter) => (
            <button
            key={filter}
            className={`filter ${activeFilter === filter ? "active" : ""}`}
            onClick={() => setActiveFilter(filter as FilterType)}
            >
            {filter}
            </button>
            ))} */}

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

            {/* <button className="filter active">All</button>
          <button className="filter">Essay</button>
          <button className="filter">Report</button>
          <button className="filter premium">Premium</button> */}
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
              key={template.id}
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
