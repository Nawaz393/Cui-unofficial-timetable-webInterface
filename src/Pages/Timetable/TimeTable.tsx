import { Container, Typography, useMediaQuery } from '@mui/material';
import { useMyContext } from '../../context';
import { useState } from 'react';

import { AutoCompleteDropDown } from '../../components';
import { fetchTimeTable } from './fetchTimeTable';
import { TimeTableTabs } from './TimeTableTabs';

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
      <Typography
        sx={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#00396b',
          fontFamily: ' "Dancing Script", cursive',
          text: 'center',
          pt: 1,
        }}
        variant='h1'
      >
        TimeTable
      </Typography>

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
