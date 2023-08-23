import { Container, Typography } from '@mui/material';
import { FaGithub } from 'react-icons/fa';
const Footer = () => {
  return (
    <Container
    
      sx={{
      
        display: 'flex',
        flexDirection: 'column',
        background: '#303030',
        height: '12rem',
  
        //   alignItems: 'center',
        //   justifyContent: 'center',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          sx={{
            fontSize: '1rem',
            color: 'white',
            textAlign: 'center',
            py: 2,
          }}
        >
          @ {new Date().getFullYear()} All Right Reserved
        </Typography>
        <Typography>
          <FaGithub size={'1.5em'} />
        </Typography>
      </Container>
    </Container>
  );
};

export default Footer;
