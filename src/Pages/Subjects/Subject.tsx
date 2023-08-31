import { Container, useMediaQuery } from '@mui/material';
import { useMyContext } from '../../context';
import { useState } from 'react';

import {
  AutoCompleteDropDown,
  LoadOnConditions,
  ScheduleCard,
  Title,
} from '../../components';
import { fetchSubjectSchedule } from './fetchSubjectSchedule';
import SeoHelmet from '../../components/Seo/SeoHelmet';

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
        title='Subjects - CUI Timetable'
        description='Access subject schedules at CUI through the efficient CUI Timetable app. Find class timings, teachers, and more.'
        additionalKeywords={[
          'Subjects',
          'Cui Subjects',
          'Subject Schedules',
          'Cui Subject TimeTable',
          'Cui unofficial subject Timetable',
          'cui atd subject schedule',
        ]}
      />
      <Title title='Subjects' />

      <p className='color font-roboto '>
        Find the schedules for various subjects at CUI. Select a subject from
        the dropdown to view its class timings and teacher assignments.
      </p>

      <AutoCompleteDropDown
        options={subjects}
        OnClick={clickHandler}
        title='Subject'
      />
      <LoadOnConditions
        size={subjectSchedule?.length}
        isLoading={isLoading}
        isSmall={isSmall}
        cards={cards}
      />
    </Container>
  );
};
