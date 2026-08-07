import { BASE_URL } from '../var/var';
import { api } from './api';
//GEt all

/*
 * Use case 1: FETCHING EVERY SINGLE ASSIGNMENT
 */

export async function fetchAllAssignments() {
  try {
    const res = await api.get(BASE_URL, {
      params: {
        fetchAll: true,
      },
    });
    console.log(res);
    return res.data.assignments;
  } catch (err: any) {
    throw err;
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
    const response = await api.get(BASE_URL, {
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
    throw e;
  }
}

//Get one

export async function getAssignmentById(id: string) {
  try {
    if (!id) throw 'No assignment id passed into the getAssignmentIdFunction ';

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
    if (!data) throw 'No data in creating assignment';
    const res = await api.post(BASE_URL, data);
    return res.data;
  } catch (err: any) {
    throw err;
  }
}

//update

export async function updateAssignmentAPI(id: string, data: any) {
  try {
    if (!id && !data)
      throw 'No id of assignments passed or no data to update passed';

    const res = await api.put(`${BASE_URL}/${id}`, data);
    return res.data;
  } catch (err: any) {
    throw err;
  }
}
