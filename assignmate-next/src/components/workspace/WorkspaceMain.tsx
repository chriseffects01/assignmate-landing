"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAssignmentById } from "@/src/services/assignmentService";
import WorkspaceEditor from "./WorkspaceEditor";
import WorkspaceHeader from "./WorkspaceHeader";
import Notification from "../shared/Notification";
import WorkspaceMeta from "./WorkspaceMeta";
import getAssignmentId from "@/src/lib/getAssignmentId";
import "@/src/styles/workspace/workspaceMain.css";
import { updateAssignmentAPI } from "@/src/services/assignmentService";
import LoadingScreen from "../shared/LoadingScreen";
export type WorkspaceField =
  | "course"
  | "lecturer"
  | "title"
  | "courseCode"
  | "level"
  | "dueDate";

export default function WorkspaceMain() {
  ///////////////////////

  const [isEditable, setIsEditable] = useState<Record<WorkspaceField, boolean>>(
    {
      course: false,
      lecturer: false,
      title: false,
      dueDate: false,
      courseCode: false,
      level: false,
    },
  );
  const [notification, setNotification] = useState("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle",
  );
  const [values, setValues] = useState<Record<WorkspaceField, string>>({
    course: "",
    lecturer: "",
    title: "",
    dueDate: "",
    courseCode: "",
    level: "",
    //
  });

  const params = useParams();
  const id = params?.id as string;
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
    async function load() {
      if (!id) return;

      try {
        setIsLoading(true);
        const data = await getAssignmentById(id);

        setAssignments(data);
      } catch (err) {
        console.error(`Workspace mount crash:`, err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [id]);
  if (isLoading) {
    <LoadingScreen message="Loading your workspace..." />;
  }

  useEffect(() => {
    if (assignment) {
      setValues({
        course: assignment.course || "",
        lecturer: assignment.lecturer || "",
        title: assignment.title || "",
        dueDate: assignment.dueDate || "",
        courseCode: assignment.courseCode || "",
        level: assignment.level || "",
      });
    }
  }, [assignment]);

  if (!assignment) {
    return <div className="workspace-loading">Assignment not found</div>;
  }
  //////////////////////////////////////////////***************************8 */

  // Initially blank state for edits

  const handleToggleEdit = async (field: WorkspaceField): Promise<void> => {
    console.log(`Edit button Clicked for field: ${field}`);
    const turningOff = isEditable[field];

    if (turningOff) {
      try {
        const cleanValue = Array.isArray(values[field])
          ? values[field][0]
          : values[field];
        // console.log(`Awaiting DB Updatesequence for ${field}...`);

        await updateAssignmentAPI(getAssignmentId(assignment), {
          [field]: cleanValue,
        });

        // console.log(`Database updated successfully for ${field}`);
      } catch (err: any) {
        console.error(`My error: Failed to update ${field} in DB:`, err);
        console.log(err.message);
        return;
      }
    } else {
      console.log(`Field [${field}] unlocked for typing`);
    }
    setIsEditable((prev) => ({ ...prev, [field]: !prev[field] }));
  };
  const handleChange = (field: WorkspaceField, text: string): void => {
    // setIsEditable((prev) => ({ ...prev, [field]: !prev[field] }));
    console.log(`User typing in [${field}]:`, text);
    setValues((prev) => ({ ...prev, [field]: [text] }));
  };

  return (
    <>
      {notification && <Notification message={notification} />}
      <div className="workspace-layout">
        <aside className="workspace-meta-panel">
          <div className="panel-header">
            <h2 className="panel-title">Assignment Settings</h2>
          </div>
          <WorkspaceHeader
            titleValue={values.title}
            isTitleEditable={isEditable.title}
            onTitleChange={(text) => handleChange("title", text)}
            onToggleTitleEdit={() => handleToggleEdit("title")}
            assignment={assignment}
            saveStatus={saveStatus}
          />
          <WorkspaceMeta
            values={values}
            isEditable={isEditable}
            onchange={handleChange}
            onToggleEdit={handleToggleEdit}
            assignment={assignment}
          />
        </aside>

        <main className="workspace-editor-canvas">
          <WorkspaceEditor
            assignment={assignment}
            setSaveStatus={setSaveStatus}
          />
        </main>
      </div>
    </>
  );
}
