import { Container, useMediaQuery } from '@mui/material';
import { useMyContext } from '../../context';
import { useState } from 'react';

import { AutoCompleteDropDown, Title } from '../../components';
import { fetchTimeTable } from './fetchTimeTable';
import { TimeTableTabs } from './TimeTableTabs';
import SeoHelmet from '../../components/Seo/SeoHelmet';

export const TimeTable = () => {
  const { classNames } = useMyContext();
  const [timeTable, SetTimeTable] = useState<any[]>([]);
  const [days, SetDays] = useState<string[]>([]);
  const [isLoading, SetisLoading] = useState<boolean>(false);
  const isSmall = useMediaQuery('(max-width:600px)');
  const Setschedule = async (subject: string) => {
    SetisLoading(true);
    const res = await fetchTimeTable(subject);

    SetTimeTable(Object.values(res.data));
    SetDays(Object.keys(res.data));
    SetisLoading(false);
  };

  const clickHandler = async (className: string) => {
    if (className.trim() === '') {
      SetTimeTable([]);
      return;
    }
    Setschedule(className);
  };

  return (
    <Container
      sx={{
        mb: 20,
      }}
    >
      <SeoHelmet
        title='Class Time Table - CUI Timetable'
        description='Explore class timetables at CUI through the efficient CUI Timetable app. Select a class name from the dropdown to view the schedule for different days.'
        additionalKeywords={[
          'Class TimeTable',
          'Class Schedule',
          'Cui atd Class TimeTable',
          'Semester Schedule',
          'Cui Atd Semester Schedule',
          'Cui unofficial timetable',
          'Cui unofficial Timetable',
        ]}
      />
      <Title title='Class Time Table' />

      <p className='color'>
        Find class timetables for different days at CUI. Select a class name
        from the dropdown to view the schedule. Tabs represent different days of
        the week.
      </p>

      <AutoCompleteDropDown
        options={classNames}
        OnClick={clickHandler}
        title='Class Names'
      />

      <TimeTableTabs
        tabs={days}
        tabsData={timeTable}
        isSmall={isSmall}
        isLoading={isLoading}
      />
    </Container>
  );
};
