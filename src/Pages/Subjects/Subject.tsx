import { Container, Typography, useMediaQuery } from '@mui/material';
import { useMyContext } from '../../context';
import { useState } from 'react';

import {
  AutoCompleteDropDown,
  LoadOnConditions,
  ScheduleCard,
  Title,
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
        display: isSmall ? 'block' : 'block',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 2,
      }}
    >
      <Title title='Subjects' />

      <AutoCompleteDropDown
        options={subjects}
        OnClick={clickHandler}
        title='Subject'
      />
      <LoadOnConditions size={subjectSchedule.length} isLoading={isLoading} isSmall={isSmall} cards={cards} />
    </Container>
  );
};
