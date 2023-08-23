import { usefetch } from '../../hooks';
export const fetchTeacherSchedule = (teacherName: string) => {
    const response = usefetch(`/teacher/${teacherName}`);
  return response;
};
