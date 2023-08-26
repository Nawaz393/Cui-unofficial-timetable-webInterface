import { Container, useMediaQuery } from '@mui/material';
import { useState } from 'react';

import {
  AutoCompleteDropDown,
  LoadOnConditions,
  Title,
} from '../../components';
import { fetchFreeSlots } from './fetchFreeSlots';
import { FreeSlotCard } from './FreeSlotCard';
import FreeSlotType from './freeSlotType';

export const FreeSlots = () => {
  const [freeSlots, SetFreeSlots] = useState<FreeSlotType>({});
  const [isLoading, SetisLoading] = useState<boolean>(false);
  const isSmall = useMediaQuery('(max-width:600px)');
  const Setschedule = async (day: string) => {
    SetisLoading(true);
    const res = await fetchFreeSlots(day);
    SetFreeSlots(res.data);
    console.log(res.data);
    SetisLoading(false);
  };



  const days=['Monday','Tuesday','Wednesday','Thursday','Friday'];
  const clickHandler = async (day: string) => {
    if (day === '') {
      SetFreeSlots({});
      return;
    }
    Setschedule(day);
  };

  const cards = Object.keys(freeSlots)?.map((item, index) => (
    <FreeSlotCard key={index} class_name={item} time_slots={freeSlots[item]} />
  ));
  return (
    <Container
      sx={{
        mb: 20,

        display: isSmall ? 'block' : 'block',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',

        gap: 2,
      }}
    >
      <Title title='Free Slots' />

      <AutoCompleteDropDown
        options={days}
        OnClick={clickHandler}
        title='Day'
      />
      <LoadOnConditions size={Object.keys(freeSlots)?.length} isLoading={isLoading} isSmall={isSmall} cards={cards} />
    </Container>
  );
};
