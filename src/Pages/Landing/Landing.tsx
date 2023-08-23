import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { LandingSkeleton } from '../../components';
import { useMyContext } from '../../context';

export const Landing = (): ReactNode => {
  const { loading } = useMyContext();

  if (loading) {
    return (
      <div className='h-full p-10 sm:py-28'>
        <LandingSkeleton />
      </div>
    );
  }
  return (
    <div className='h-full p-10 sm:py-28'>
      
      <h1 className='font-bold text-[38px] py-2 tracking-wider font-roboto  sm:w-1/2 color'>
        Efficient Timetable Management
      </h1>
      <p className='color leading-7 text-lg font-roboto mt-4'>
        Our platform provides a comprehensive solution for managing class, room,
        teacher, and subject schedules. Try it Now.
      </p>
      <Link to='/features'>
        <button className='mt-8 bg-[#00396b] text-white hover:bg-[#002c4d] transition-colors delay-100 transform hover:-translate-y-1 text-lg font-bold py-3 px-8 rounded'>
          Explore Now
        </button>
      </Link>
    </div>
  );
};

