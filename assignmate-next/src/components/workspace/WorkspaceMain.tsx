"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAssignments } from "@/src/lib/assignmentStorage";
import WorkspaceEditor from "./WorkspaceEditor";
import WorkspaceHeader from "./WorkspaceHeader";
import Notification from "../shared/Notification";

export default function WorkspaceMain() {
  const params = useParams();
  const id = params?.id as string;

  const [notification, setNotification] = useState("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle",
  );

  useEffect(() => {
    if (saveStatus === "saved") {
      setNotification("All changes saved");

      setTimeout(() => {
        setNotification("");
      }, 2000);
    }
  }, [saveStatus]);

  const [assignment, setAssignments] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!id) return;

    const all = getAssignments();
    const found = all.find((a) => a.id === id);
    setAssignments(found || null);
    setIsLoading(false);
  }, [id]);
  if (isLoading) {
    <div className="workspace-loading">Loading...</div>;
  }

  if (!assignment) {
    return <div className="workspace-loading">Assignment not found</div>;
  }

  return (
    <>
      {notification && <Notification message={notification} />}
      <div className="workspace-container">
        <WorkspaceHeader assignment={assignment} saveStatus={saveStatus} />
        <WorkspaceEditor
          assignment={assignment}
          setSaveStatus={setSaveStatus}
        />
      </div>
    </>
  );
}
