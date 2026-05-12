"use client";

import { useState, useEffect } from "react";
import { searchAssignments } from "@/src/lib/searchAssignments";
import getAssignmentId from "@/src/lib/getAssignmentId";

import { useRouter } from "next/navigation";
import "@/src/styles/layout/searchbar.css";
import "@/src/styles/assignments/assignments-main.css";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const [results, setResults] = useState<any[]>([]);
  const [show, setShow] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function load() {
      const res = await searchAssignments(query);
      const timeout = setTimeout(() => {
        setResults(res);
      }, 300);

      return () => clearTimeout(timeout);
    }
    load();
  }, [query]);
  console.log(results, results.length);

  return (
    <div className="assignments-search-wrap">
      <input
        type="text"
        name="search-assignments"
        className="assignments-search"
        placeholder="Search assignments..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShow(true);
          console.log(show);
        }}
        onBlur={() => setTimeout(() => setShow(false), 200)}
      />
      <div className="search-container">
        {show && results.length > 0 && (
          <div className="search-dropdown">
            {results.slice(0, 5).map((item) => (
              <div
                className="search-item"
                key={getAssignmentId(item)}
                onClick={() =>
                  router.push(`/workspace/${getAssignmentId(item)}`)
                }
              >
                <span>{item.title}</span>
                <small>{item.course}</small>
                <small>{item.courseCode}</small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
