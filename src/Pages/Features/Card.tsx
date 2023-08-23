import { Card, Typography } from '@mui/material';
import ButtonCardProps from './ButtonCardProps';
import { useNavigate } from 'react-router-dom';

const ButtonCard: React.FC<ButtonCardProps> = ({ name, icon, description,link }) => {
  const navigate=useNavigate()
  return (
    <Card
onClick={()=>{
navigate(link)
}}
      variant='outlined'
      sx={{
        display: 'flex',
        cursor:"pointer",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        background: '#00396b',
        p: 2,
        borderRadius: 2,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}

  
    >
      <Typography
        sx={{
          fontSize: '1rem',
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center',
        }}
      >
        {name}
      </Typography>

      <Typography
        sx={{
          fontSize: '1rem',
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center',
          py: 2,
        }}
      >
        {icon}
      </Typography>

      <Typography
        sx={{
          fontSize: '0.8rem',

          color: 'white',
          textAlign: 'center',
        }}
      >
        {description}
      </Typography>
    </Card>
  );
};

export default ButtonCard;
