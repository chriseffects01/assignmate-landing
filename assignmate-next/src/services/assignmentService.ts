import { ASSIGNMENT_URL } from '../var/var';
import { api, normalizeApiError } from './api';
//GEt all

/*
 * Use case 1: FETCHING EVERY SINGLE ASSIGNMENT
 */

export async function fetchAllAssignments() {
  try {
    const res = await api.get(ASSIGNMENT_URL, {
      params: {
        fetchAll: true,
      },
    });
    return res.data.assignments;
  } catch (err: any) {
    normalizeApiError(err);
  }
}
// CRUD --
/*
 * Use case 2: FETCHING ASSIGNMENTS PER CONDITION (PAGINATION ORR QUERY)
 */

export async function fetchAssignmentsByQuery(
  search: string = '',
  page: number = 1,
  limit: number = 6,
  status: string = 'all',
  fetchAll: boolean = false
) {
  try {
    const response = await api.get(ASSIGNMENT_URL, {
      params: {
        search,
        page,
        limit,
        status,
        fetchAll: fetchAll,
      },
    });

    return response.data;
  } catch (e: any) {
    console.error('error getting assignments by query  ');
    normalizeApiError(e);
  }
}

//Get one

export async function getAssignmentById(id: string) {
  try {
    if (!id) throw 'No assignment id passed into the getAssignmentIdFunction ';

    const res = await api.get(`${ASSIGNMENT_URL}/${id}`);

    return res.data;
  } catch (err: any) {
    console.error(`Error getting assignment id: ${id}`, err);
    normalizeApiError(err);
  }
}

//CREATE
export async function createAssignmentAPI(data: any) {
  try {
    if (!data) throw 'No data in creating assignment';
    const res = await api.post(ASSIGNMENT_URL, data);
    return res.data;
  } catch (err: any) {
    console.error('Error creating assignment :', err);
    normalizeApiError(err);
  }
}

//update

export async function updateAssignmentAPI(id: string, data: any) {
  try {
    if (!id && !data)
      throw 'No id of assignments passed or no data to update passed';

    const res = await api.put(`${ASSIGNMENT_URL}/${id}`, data);
    return res.data;
  } catch (err: any) {
    normalizeApiError(err);
  }
}

export async function deleteAssignment(id: string) {
  try {
    if (!id) throw 'No assignment id Provided';
    const res = await api.delete<{
      success: boolean;
      message: string;
    }>(`${ASSIGNMENT_URL}/${id}`);
    return res.data;
  } catch (e: any) {
    throw normalizeApiError(e);
  }
}
