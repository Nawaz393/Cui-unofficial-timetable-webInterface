import { Typography } from '@mui/material';

export const Title: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Typography
      sx={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#00396b',
        fontFamily: ' "Dancing Script", cursive',
        text: 'center',
        py: 1,
      }}
      variant='h1'
    >
      {title}
    </Typography>
  );
};
