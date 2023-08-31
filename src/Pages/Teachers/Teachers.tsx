import { Container, useMediaQuery } from '@mui/material';
import { useMyContext } from '../../context';
import { useState } from 'react';
import { fetchTeacherSchedule } from './fetchTeacherSchedule';
import {
  AutoCompleteDropDown,
  LoadOnConditions,
  ScheduleCard,
  Title,
} from '../../components';
import SeoHelmet from '../../components/Seo/SeoHelmet';

export const Teachers = () => {
  const { teachers } = useMyContext();
  const [teacherSchedule, SetTeacherSchedule] = useState<any[]>([]);
  const [isLoading, SetisLoading] = useState<boolean>(false);
  const isSmall = useMediaQuery('(max-width:600px)');
  const Setschedule = async (teacherName: string) => {
    SetisLoading(true);
    const res = await fetchTeacherSchedule(teacherName);
    SetTeacherSchedule(res.data);
    SetisLoading(false);
  };

  const cards = teacherSchedule?.map((item, index) => (
    <ScheduleCard key={index + 1} cardData={item} />
  ));

  const clickHandler = async (teacherName: string) => {
    if (teacherName === '') {
      SetTeacherSchedule([]);
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
        title='Teachers - CUI Timetable'
        description='Explore teacher schedules at CUI through the efficient CUI Timetable app. Find class timings, subjects, and more.'
        additionalKeywords={[
          'Teachers',
          'Cui Teachers',
          'Teacher Schedules',
          'Cui Teacher TimeTable',
          'Cui unofficial teacher Timetable',
          'cui atd teacher schedule',
        ]}
      />
      <Title title='Teachers' />

      <p className='color'>
        Discover the schedules of different teachers at CUI. Select a teacher
        from the dropdown to view their class timings and assigned subjects.
      </p>

      <AutoCompleteDropDown
        options={teachers}
        OnClick={clickHandler}
        title='Teacher'
      />
      <LoadOnConditions
        size={teacherSchedule?.length}
        isLoading={isLoading}
        isSmall={isSmall}
        cards={cards}
      />
    </Container>
  );
};
