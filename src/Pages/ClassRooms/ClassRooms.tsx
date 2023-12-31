import { Container, useMediaQuery } from '@mui/material';
import { useMyContext } from '../../context';
import { useState } from 'react';
import {
  AutoCompleteDropDown,
  LoadOnConditions,
  ScheduleCard,
  Title,
} from '../../components';
import { fetchClassRoom } from './fetchClassRoom';
import { BiSearch } from 'react-icons/bi';
import SeoHelmet from '../../components/Seo/SeoHelmet';

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
      <SeoHelmet
        title='Class Room Schedule - CUI Timetable'
        description='Access class room schedules at CUI through the efficient CUI Timetable app. Use the dropdowns to select a room, time slot, and day for viewing the schedule.'
        additionalKeywords={[
          'ClassRoom',
          'Cui ClassRoom',
          'Cui ClassRoom Schedule',
          'Cui ClassRoom TimeTable',
          'Cui ClassRoom Schedule',
          'Cui ClassRoom TimeTable',
          'Cui unofficial ClassRoom Schedule',
          'Cui unofficial ClassRoom Timetable',
          'cui atd ClassRoom schedule',
          'cui atd unofficial ClassRoom schedule',
        ]}
      />
      <Title title={'Class Room Schedule'} />

      <p className='color'>
        Access class room schedules at CUI. Use the dropdowns to select a room,
        time slot, and day for viewing the schedule. Click the search icon to
        retrieve the schedule for your selected criteria.
      </p>

      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column', // Stack elements vertically on mobile
          alignItems: 'center',
          padding: '5px', // Add some padding for spacing
          '@media (min-width: 600px)': {
            flexDirection: 'row', // Align elements horizontally on desktop
            justifyContent: 'center',
          },
        }}
      >
        <AutoCompleteDropDown
          options={classRooms}
          OnClick={handleRoomChange}
          title='ClassRoom'
          className='w-full  py-2 px-4  text-base sm:text-lg border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-gray-900'
        />
        <AutoCompleteDropDown
          title='TimeSlot'
          options={timeSlots}
          OnClick={handleTimeSlotChange}
          className='w-full  py-2 px-4 text-base sm:text-lg border border-gray-300 rounded-md focus:outline-none focus:ring focus:focus:border-gray-900'
        />
        <AutoCompleteDropDown
          options={days}
          OnClick={handleDayChange}
          title='Day'
          className='w-full  py-2 px-4 text-base sm:text-lg border border-gray-300 rounded-md focus:outline-none focus:ring focus:focus:border-gray-900'
        />

        <div
          role='button '
          className=' flex justify-center sm:mt-10 mt-3 items-center px-1  cursor-pointer '
          onClick={handleClick}
        >
          <BiSearch className='text-gray-500 text-4xl self-center ' />
        </div>
      </Container>

      <LoadOnConditions
        size={roomSchedule?.length}
        isLoading={isLoading}
        isSmall={isSmall}
        cards={cards}
      />
    </Container>
  );
};
