import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { LandingSkeleton } from '../../components';
import { useMyContext } from '../../context';
import SeoHelmet from '../../components/Seo/SeoHelmet';
import { Container } from '@mui/material';
import RoundBox from './RoundBox';

export const Landing = (): ReactNode => {
  const { loading, classNames, classRooms, teachers } = useMyContext();

  if (loading) {
    return (
      <div className='h-full p-10 sm:py-28'>
        <LandingSkeleton />
      </div>
    );
  }
  return (
    <div className='h-full p-10 sm:py-28'>
      <SeoHelmet
        title='Home - CUI Timetable'
        description='Efficient timetable management solution for classes, rooms, teachers, and subjects. Explore now!'
        additionalKeywords={[
          'CUI Timetable',
          'Class Schedule',
          'Subject Schedule',
          'Teachers Schedule',
        ]}
      />

      <h1 className='font-bold text-[38px] py-2 tracking-wider font-roboto sm:w-1/2 color'>
        Efficient Timetable Management
      </h1>
      <p className='color leading-7 text-lg font-roboto mt-4'>
        Our platform provides a comprehensive solution for managing class, room,
        teacher, and subject schedules. Try it Now.
      </p>
      <Link to='/features' rel='canonical' className='mt-8  text-center'>
        <button className='mt-8 bg-[#00396b] text-white hover:bg-[#002c4d] transition-colors delay-100 transform hover:-translate-y-1 text-lg font-bold py-3 px-8 rounded'>
          Explore Features
        </button>
      </Link>

      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'start',
          justifyContent: 'space-around',
          marginTop: 6,
        }}
      >
        <RoundBox title='Total Rooms' size={classRooms?.length} />
        <RoundBox title='Total Teachers' size={teachers?.length} />
        <RoundBox title='Total Classes' size={classNames.length} />
      </Container>
    </div>
  );
};
