import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
interface FreeSlotCardProps {
  class_name: string;
  time_slots: string[];
}
export const FreeSlotCard: React.FC<FreeSlotCardProps> = ({class_name,time_slots }) => {
  return (
    <Card
      sx={{
        Width: 300,
        margin: '20px',
        backgroundColor: '#F0F0F0', // Brighter background color
        color: '#000000', // Text color
        '& .title': {
          fontSize: '1.4rem',
          fontWeight: 'bold',
          color: '#555555', // Dark gray title
          marginBottom: '8px',
        },
        '& .subtitle': {
            fontSize: '1.1rem',
            fontWeight: 'bold',
            color: '#555555', // Dark gray title
            marginBottom: '4px',
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
        <Typography className='title'>{class_name!}</Typography>
        <Typography className='subtitle'>{"FreeSlots"}</Typography>
        {time_slots?.map((item,index)=>{
            return <Typography className='infoText' key={index}>{item}</Typography>
        })}
      </CardContent>
    </Card>
  );
};
