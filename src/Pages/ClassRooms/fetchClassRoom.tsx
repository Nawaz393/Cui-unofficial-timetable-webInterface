import { usefetch } from '../../hooks';
export const fetchClassRoom = (
  roomName: string,
  timeSlot: string,
  day: string,
) => {
  const response = usefetch(
    `/roomName/${roomName}/timeSlot/${timeSlot}/day/${day}`,
  );
  return response;
};
