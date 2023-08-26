import { Container, Typography, useMediaQuery } from '@mui/material';
import { useMyContext } from '../../context';
import { useState } from 'react';
import {
  AutoCompleteDropDown,
  LoadOnConditions,
  NotFound,
  ScheduleCard,
  ScheduleCardSekelton,
  Title,
} from '../../components';
import { fetchClassRoom } from './fetchClassRoom';
import { BiSearch } from 'react-icons/bi';

export const ClassRooms = () => {
  const { timeSlots, classRooms } = useMyContext();
  const [roomSchedule, SetroomSchedule] = useState<any[]>([]);
  const [isLoading, SetisLoading] = useState<boolean>(false);
  const isSmall = useMediaQuery('(max-width:600px)');

  const [dropdownvalues, setDropdownvalues] = useState({
    roomName: '',
    timeSlot: '',
    day: '',
  });

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const Setschedule = async (
    roomName: string,
    timeSlot: string,
    day: string,
  ) => {
    SetisLoading(true);
    const res = await fetchClassRoom(roomName, timeSlot, day);
    SetroomSchedule(res.data);
    console.log(res.data);
    SetisLoading(false);
  };

  const cards = roomSchedule?.map((item, index) => (
    <ScheduleCard key={index} cardData={item} />
  ));

  const handleDayChange = (day: string) => {
    setDropdownvalues({ ...dropdownvalues, day });
  };

  const handleRoomChange = (roomName: string) => {
    setDropdownvalues({ ...dropdownvalues, roomName });
  };

  const handleTimeSlotChange = (timeSlot: string) => {
    setDropdownvalues({ ...dropdownvalues, timeSlot });
  };

  const handleClick = () => {
    const { day, roomName, timeSlot } = dropdownvalues;

    if (
      day.trim().length <= 3 ||
      roomName.trim().length === 0 ||
      timeSlot.trim().length <= 3
    ) {
      alert('Please fill all the fields with at least 4 characters.');
      return;
    }

    Setschedule(roomName, timeSlot, day);
  };

  return (
    <Container
      sx={{
        mb: 20,

        display: isSmall ? 'block' : 'block',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',

        gap: 2,
      }}
    >
      <Title title={'ClassRoom'} />
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <AutoCompleteDropDown
          options={classRooms}
          OnClick={handleRoomChange}
          title='ClassRoom'
        />
        <AutoCompleteDropDown
          title='TimeSlot'
          options={timeSlots}
          OnClick={handleTimeSlotChange}
        />

        <AutoCompleteDropDown
          options={days}
          OnClick={handleDayChange}
          title='Day'
        />
        <div
          role='button '
          className=' flex justify-center mt-10 items-center px-1  cursor-pointer '
          onClick={handleClick}
        >
          <BiSearch className='text-gray-500 text-4xl self-center ' />
        </div>
      </Container>

      <LoadOnConditions
        size={roomSchedule.length}
        isLoading={isLoading}
        isSmall={isSmall}
        cards={cards}
      />
    </Container>
  );
};
