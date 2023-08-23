import { Dispatch, SetStateAction } from 'react';

export interface MyContextType {
  teachers: string[];
  setTeachers: Dispatch<SetStateAction<string[]>>;
  subjects: string[];
  setSubjects: Dispatch<SetStateAction<string[]>>;
  classRooms: string[];
  setClassRooms: Dispatch<SetStateAction<string[]>>;
  timeSlots: string[];
  setTimeSlots: Dispatch<SetStateAction<string[]>>;
  classNames: string[];
  setClassNames: Dispatch<SetStateAction<string[]>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
