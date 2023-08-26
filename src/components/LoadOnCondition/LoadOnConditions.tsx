import React from 'react';
import { NotFound, ScheduleCardSekelton } from '..';

interface LoadOnConditionProps {
  size: number;

  isLoading: boolean;
  isSmall: boolean;

  cards: any[];
}
export const LoadOnConditions: React.FC<LoadOnConditionProps> = ({
  size,
  isLoading,
  isSmall,
  cards,
}) => {
  if (size === 0 && !isLoading) {
    return <NotFound />;
  } else if (isLoading) {
    return <ScheduleCardSekelton isSmall={isSmall} />;
  } else {
    return (
      <div className={`grid ${!isSmall ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {cards}
      </div>
    );
  }
};
