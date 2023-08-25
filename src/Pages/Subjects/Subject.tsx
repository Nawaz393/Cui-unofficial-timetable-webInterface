import { Container, Typography, useMediaQuery } from '@mui/material';
import { useMyContext } from '../../context';
import { useState } from 'react';

import {
  AutoCompleteDropDown,
  NotFound,
  ScheduleCard,
  ScheduleCardSekelton,
} from '../../components';
import { fetchSubjectSchedule } from './fetchSubjectSchedule';

export const Subjects = () => {
  const { subjects } = useMyContext();
  const [subjectSchedule, SetSubjectSchedule] = useState<any[]>([]);
  const [isLoading, SetisLoading] = useState<boolean>(false);
  const isSmall = useMediaQuery('(max-width:600px)');
  const Setschedule = async (subject: string) => {
    SetisLoading(true);
    const res = await fetchSubjectSchedule(subject);
    SetSubjectSchedule(res.data);
    console.log(res.data);
    SetisLoading(false);
  };

  const cards = subjectSchedule?.map((item, index) => (
    <ScheduleCard key={index} cardData={item} />
  ));

  const clickHandler = async (teacherName: string) => {
    if (teacherName === '') {
      SetSubjectSchedule([]);
      return;
    }
    Setschedule(teacherName);
  };
  console.log(subjectSchedule.length);

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
        Subjects
      </Typography>

      <AutoCompleteDropDown
        options={subjects}
        OnClick={clickHandler}
        title='Subject'
      />
      {subjectSchedule?.length === 0 && !isLoading ? (
        <NotFound />
      ) : isLoading ? (
        <ScheduleCardSekelton isSmall={isSmall} />
      ) : (
        <div className={`grid ${!isSmall ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {cards}
        </div>
      )}
    </Container>
  );
};
