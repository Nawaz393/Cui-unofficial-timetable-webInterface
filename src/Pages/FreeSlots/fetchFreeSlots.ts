import { usefetch } from '../../hooks';

export const fetchFreeSlots = async (day: string) => {
  const response = usefetch(`/freeSlots/day/${day}`);
  return response;
};
