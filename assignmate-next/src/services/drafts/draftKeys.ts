import { ASSIGNMENTSkEY } from '@/src/var/var';

export const getUserPrefix = (userid: string): string =>
  `${ASSIGNMENTSkEY}_${userid}`;

export const getDraftStorageKey = (
  userid: string,
  assignmentid: string
): string => `${ASSIGNMENTSkEY}_${userid}_${assignmentid}`;
