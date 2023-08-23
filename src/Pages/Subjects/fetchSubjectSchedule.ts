import { usefetch } from '../../hooks';

export const fetchSubjectSchedule = async (subject: string) => {
  const response = usefetch(`/subject/${subject}`);
  return response;
};
