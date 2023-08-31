import { Box, Typography } from '@mui/material';

interface BoxProps {
  size: number;
  title: string;
}

const RoundBox: React.FC<BoxProps> = ({ size, title }) => {
  return (
    <Box
      sx={{
        border: '1px solid #e0e0e0',
        borderRadius: '50%',
        p:2,
        mr:2,
        boxShadow: '0px 0px 10px #e0e0e0',
      }}
    >
      <Typography
        sx={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#283593',
          textAlign: 'center',
        }}
      >
        {size}
      </Typography>
      <Typography
        sx={{
          color: '#555',
          fontSize: '1rem',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default RoundBox;
