import { BASE_URL } from "../var/var";
import { api } from "./api";
//GEt all

export async function fetchAssignments() {
  try {
    const res = await api.get(BASE_URL);
    return res.data;
  } catch (err: any) {
    throw err;
  }
}

//Get one

export async function getAssignmentById(id: string) {
  try {
    // if (!id) return;
    const res = await api.get(`${BASE_URL}/${id}`);
    return res.data;
  } catch (err: any) {
    console.error(`Error getting assignment id: ${id}`, err);
    throw err;
  }
}

//CREATE
export async function createAssignmentAPI(data: any) {
  try {
    const res = await api.post(BASE_URL, data);
    return res.data;
  } catch (err: any) {
    throw err;
  }
}

//update

export async function updateAssignmentAPI(id: string, data: any) {
  try {
    const res = await api.put(`${BASE_URL}/${id}`, data);
    return res.data;
  } catch (err: any) {
    throw err;
  }
}
