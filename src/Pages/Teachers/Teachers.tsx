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
        title='Teachers'
        additionalKeywords={[
          'Teachers',
          'Cui Teachers',
          'Cui Teachers Schedule',
          'Cui Teachers TimeTable',
          'Cui Teachers Class Schedule',
          'Cui Teachers Class TimeTable',
          'Cui Teachers Class Schedule',
        ]}
      />
      <Title title='Teachers' />
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
