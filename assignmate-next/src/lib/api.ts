import { BASE_URL } from "../var/var";
import { api } from "../services/api";
//GEt all

export async function fetchAssignments() {
  try {
    const res = await api.get(BASE_URL);
    return res.data;
  } catch (err: any) {
    return null;
  }
}

//CREATE
export async function createAssignmentAPI(data: any) {
  try {
    const res = await api.post(BASE_URL, data);
    return res.data;
  } catch (err: any) {
    return null;
  }
}

//update

export async function updateAssignmentAPI(id: string, data: any) {
  try {
    const res = await api.put(`${BASE_URL}/${id}`, data);
    return res.data;
  } catch (err: any) {
    return null;
  }
}
