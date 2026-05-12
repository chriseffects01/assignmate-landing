import { BASE_URL } from "../var/var";
//GEt all

export async function fetchAssignments() {
  try {
    const res = await fetch(BASE_URL);
    return await res.json();
  } catch (err: any) {
    return null;
  }
}

//CREATE
export async function createAssignmentAPI(data: any) {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err: any) {
    return null;
  }
}

//update

export async function updateAssignmentAPI(id: string, data: any) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err: any) {
    return null;
  }
}
