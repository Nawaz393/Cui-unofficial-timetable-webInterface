import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { ScheduleCardType } from '..';

export const ScheduleCard: React.FC<{ cardData: ScheduleCardType }> = ({
  cardData,
}) => {
  return (
    <Card
      sx={{
        maxWidth: 300,
        margin: '20px',
        backgroundColor: '#F0F0F0', // Brighter background color
        color: '#000000', // Text color
        '& .title': {
          fontSize: '1.4rem',
          fontWeight: 'bold',
          color: '#555555', // Dark gray title
          marginBottom: '8px',
        },
        '& .infoText': {
          fontSize: '0.9rem',
          fontWeight: 'normal',
          color: '#00000', // Light gray information text
          marginBottom: '4px',
        },
        '&:hover': {
          backgroundColor: '#E0E0E0', // Lighter background color on hover
        },
      }}
    >
      <CardContent>
        <Typography className='title'>{cardData?.class_name}</Typography>
        <Typography className='infoText'>{cardData?.class_room}</Typography>
        <Typography className='infoText'>{cardData?.day}</Typography>
        <Typography className='infoText'>{cardData?.subject}</Typography>
        <Typography className='infoText'>{cardData?.teacher}</Typography>
        <Typography className='infoText'>{cardData?.time_slot}</Typography>
      </CardContent>
    </Card>
  );
};
