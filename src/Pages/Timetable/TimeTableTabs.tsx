import { Box, Container, Tab, Tabs } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { NotFound, ScheduleCard, ScheduleCardSekelton } from '../../components';

interface TimeTableTabsProps {
  tabs: string[];
  tabsData: any[][];
  isSmall: boolean;
  isLoading: boolean;
}

export const TimeTableTabs: React.FC<TimeTableTabsProps> = ({
  tabs,
  tabsData,
  isSmall,
  isLoading,
}) => {
  const [selectedtab, setSelectedTab] = useState<number>(0);

  const handletabChange = (event: ChangeEvent<{}>, value: number) => {
    event.preventDefault();
    setSelectedTab(value);
  };

  console.log(tabsData);
  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={selectedtab}
          onChange={handletabChange}
          indicatorColor='secondary'
          textColor='inherit'
          variant={isSmall ? 'scrollable' : 'fullWidth'}
          scrollButtons={true}
          allowScrollButtonsMobile
          sx={{
            marginY: 1,
          }}
        >
          {tabs?.map((tab, index) => (
            <Tab key={index} label={!isSmall ? tab : tab.slice(0, 3)} />
          ))}
        </Tabs>
      </Box>
      <Container>
        {tabsData?.length === 0 && !isLoading ? (
          <NotFound />
        ) : isLoading ? (
          <ScheduleCardSekelton isSmall={isSmall} />
        ) : (
          <div className={`grid  ${!isSmall ? 'grid-cols-2' : 'grid-cols-1'} `}>
            {tabsData[selectedtab]?.map((item: any, index: number) => (
              <ScheduleCard key={index} cardData={item} />
            ))}
          </div>
        )}
      </Container>
    </Box>
  );
};
