import { usefetch } from '../../hooks';

export const fetchTimeTable = async (className: string) => {
  const response = await usefetch(`/class/${className}`);
  return response;
};
