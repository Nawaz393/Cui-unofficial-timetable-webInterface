import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Link, Grid, Box, IconButton } from '@mui/material';
import { BsEnvelope, BsGithub } from 'react-icons/bs';

const About: React.FC = () => {
  const features = [
    "View Teacher's Schedule",
    "View a Subject's Schedule",
    'View your class schedules',
    'Stay organized with weekly timetable',
    'Easy navigation between different days',
    'Responsive design for mobile and desktop',
  ];

  return (
    <Container maxWidth='md' sx={{ marginTop: 1, padding: 2 }}>
      <Typography
        variant='h3'
        sx={{
          marginBottom: 3,
          fontFamily: 'Montserrat, sans-serif',
          color: '#283593',
        }}
      >
        About CUI unoffical Timetable
      </Typography>
      <Typography variant='body1' sx={{ marginBottom: 3, color: '#555' }}>
        Welcome to the CUI Timetable application! This application provides an intuitive way to access and manage your class schedules at CUI.
      </Typography>
      <Typography variant='body1' sx={{ marginBottom: 4, color: '#555' }}>
        Whether you're a student or a faculty member, our goal is to help you stay organized and enhance your academic experience.
      </Typography>
      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
        <Typography variant='h5' sx={{ marginBottom: 3, color: '#37474F' }}>
          Key Features:
        </Typography>
        <List sx={{ marginTop: 2, marginBottom: 2 }}>
          {features.map((feature, index) => (
            <ListItem key={index} sx={{ backgroundColor: '#ECEFF1', borderRadius: 8, marginBottom: 1, paddingLeft: 1 }}>
              <ListItemText primary={feature} sx={{ color: '#333', fontWeight: 'bold' }} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Typography variant='body1' sx={{ marginBottom: 3, color: '#555' }}>
        We're dedicated to continually improving your experience. We hope you find this application indispensable for your academic journey.
      </Typography>
      <Typography variant='h5' sx={{ marginBottom: 3, color: '#37474F' }}>
        Developer Info:
      </Typography>
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant='body1' sx={{ marginBottom: 1 }}>
          This application is developed by <b>Mohammad Nawaz</b>.
        </Typography>
        <Grid container spacing={2}>
          <Grid item sx={{ m: 1 }}>
            <Link href='https://github.com/Nawaz393' target='_blank' rel='noopener noreferrer' color='secondary'>
              <IconButton sx={{ m: 1 }}>
                <BsGithub size='2em' />
              </IconButton>
            </Link>
          </Grid>
          <Grid item sx={{ m: 1 }}>
            <Link href='mailto:mohdnawaz6393@gmail.com' color='secondary'>
              <IconButton sx={{ m: 1 }}>
                <BsEnvelope size='2em' />
              </IconButton>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default About;
