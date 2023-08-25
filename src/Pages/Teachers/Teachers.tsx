import { Container, Typography, useMediaQuery } from '@mui/material';
import { useMyContext } from '../../context';
import { useState } from 'react';
import { fetchTeacherSchedule } from './fetchTeacherSchedule';
import {
  AutoCompleteDropDown,
  NotFound,
  ScheduleCard,
  ScheduleCardSekelton,
} from '../../components';

export const Teachers = () => {
  const { teachers } = useMyContext();
  const [teacherSchedule, SetTeacherSchedule] = useState<any[]>([]);
  const [isLoading, SetisLoading] = useState<boolean>(false);
  const isSmall = useMediaQuery('(max-width:600px)');
  const Setschedule = async (teacherName: string) => {
    SetisLoading(true);
    const res = await fetchTeacherSchedule(teacherName);
    SetTeacherSchedule(res.data);
    console.log(res.data);
    SetisLoading(false);
  };

  const cards = teacherSchedule?.map((item) => (
    <ScheduleCard key={item.id} cardData={item} />
  ));

  const clickHandler = async (teacherName: string) => {
    if (teacherName === '') {
      SetTeacherSchedule([]);
      return;
    }
    Setschedule(teacherName);
  };
  console.log(teacherSchedule.length);

  return (
    <Container
      sx={{
        mb: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'stretch',
      



         
      }}
    >
      <Typography
        sx={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#00396b',
          fontFamily: ' "Dancing Script", cursive',
          text: 'center',
          py: 1,
        }}
        variant='h1'
      >
        Teachers
      </Typography>

      <AutoCompleteDropDown
        options={teachers}
        OnClick={clickHandler}
        title='Teacher'
      />
      {teacherSchedule?.length === 0 && !isLoading ? (
        <NotFound />
      ) : isLoading ? (
        <ScheduleCardSekelton isSmall={isSmall} />
      ) : (
        <div 
        
       
        
        className={`grid   ${!isSmall ? 'grid-cols-2' : 'grid-cols-1'} `}>
          {cards}
        </div>
      )}
    </Container>
  );
};
