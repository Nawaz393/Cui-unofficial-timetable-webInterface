import ButtonCardProps from './ButtonCardProps';
import { BsPerson } from 'react-icons/bs';
import { BiSolidSchool, BiSolidBook, BiSolidCalendar } from 'react-icons/bi';
const ButtonCardData: ButtonCardProps[] = [
  {
    name: 'Teachers',
    icon: <BsPerson size='3em' />,
    description: "See a Teacher's Schedule.",
    link: '/teachers',
  },
  {
    name: 'ClassRooms',
    icon: <BiSolidSchool size='3em' />,
    description: 'Search detail based on RoomNo & TimeSlot.',
    link: '/classroom',
  },
  {
    name: 'Subjects',
    icon: <BiSolidBook size='3em' />,
    description: 'Check assigned Teacher for a subject.',
    link: '/subjects',
  },
  {
    name: 'Timetable',
    icon: <BiSolidCalendar size='3em' />,
    description: 'Check a Class Schedule.',
    link: '/timetable',
  },
];

export default ButtonCardData;
