import {
  fetchAssignments,
  createAssignmentAPI,
  updateAssignmentAPI,
} from "../lib/api";

import {
  getAssignments as getLocalAssignments,
  addAssignment,
  updateAssignment,
} from "../lib/assignmentStorage";

//Create

function checkApiData(apiData: any) {
  if (apiData) {
    return apiData;
  }
}

export async function createAssignment(data: any) {
  if (navigator.onLine) {
    //Removing old id so backend will return new one
    const { _id, ...cleanData } = data;
    const apiData = await createAssignmentAPI(cleanData);

    if (apiData) {
      return apiData;
    }
  }

  addAssignment(data);
  return data;
}

//Get
export async function getAssignments() {
  if (navigator.onLine) {
    try {
      const apiData = await fetchAssignments();

      if (apiData) {
        return apiData;
      }
    } catch (err: any) {
      console.error(err.message, err.status);
    }
  }

  return getLocalAssignments();
}

//Update

export async function saveAssignment(id: string, data: any) {
  if (navigator.onLine) {
    const apiData = await updateAssignmentAPI(id, data);
    if (apiData) {
      return apiData;
    }
  }

  updateAssignment(data);
  return data;
}
