import React from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Link,
  Grid,
  Box,
  IconButton,
} from '@mui/material';
import { BsEnvelope, BsGithub } from 'react-icons/bs';
import SeoHelmet from '../../components/Seo/SeoHelmet';

const About: React.FC = () => {
  const features = [
    "View Teacher's Schedule",
    "View a Subject's Schedule",
    'View your class schedules',
    'Stay organized with weekly timetable',
    'View your class rooms Schedule',
    'Find free slots in a room',
    'Easy navigation between different days',
    'Responsive design for mobile and desktop',
  ];

  const upcomingFeatures = [
    'Auto Grade Calculator for each subject',
    'Auto GPA Calculator for each semester',
    'Auto CGPA Calculator for all semesters',
  ];

  return (
    <Container maxWidth='md' sx={{ marginTop: 1, padding: 2 }}>
      <SeoHelmet
        title='About CUI Timetable'
        description='Learn about the CUI Timetable application and its features. Stay organized and enhance your academic experience with this intuitive timetable management tool.'
        additionalKeywords={[
          'About',
          'Cui About',
          'Cui About Schedule',
          'Cui About TimeTable',
          'Cui About Class Schedule',
          'Cui About Class TimeTable',
          'Cui About Class Schedule',
        ]}
      />
      <Typography
        variant='h1'
        sx={{
          marginBottom: 3,
          fontFamily: 'Montserrat, sans-serif',
          color: '#283593',
          fontSize: '2rem',
        }}
      >
        About CUI Unofficial Timetable
      </Typography>
      <Typography variant='body1' sx={{ marginBottom: 3, color: '#555' }}>
        Welcome to the CUI Timetable application! Discover an intuitive way to
        access and manage class schedules at CUI.
      </Typography>
      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
        <Typography variant='h5' sx={{ marginBottom: 3, color: '#37474F' }}>
          Key Features:
        </Typography>
        <List sx={{ marginTop: 2, marginBottom: 2 }}>
          {features.map((feature, index) => (
            <ListItem
              key={index}
              sx={{
                // different background color for each list item
                backgroundColor: ' #ECEFF1 ',
                borderRadius: 8,
                marginBottom: 1,
                paddingLeft: 1,
              }}
            >
              <ListItemText
                primary={feature}
                sx={{ color: '#333', fontWeight: 'bold' }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Typography variant='body1' sx={{ marginBottom: 3, color: '#555' }}>
        We're dedicated to continually improving your experience. We hope you
        find this application indispensable for your academic journey.
      </Typography>

      <Typography variant='h5' sx={{ marginBottom: 3, color: '#37474F' }}>
        Upcoming Advance Features:
      </Typography>

      {upcomingFeatures.map((feature, index) => (
        <ListItem
          key={index}
          sx={{
            // different background color  from above  dark one

            backgroundColor: '#22E000 ',
            borderRadius: 8,
            marginBottom: 1,
            paddingLeft: 1,
          }}
        >
          <ListItemText
            primary={feature}
            sx={{ color: '#333', fontWeight: 'bold' }}
          />
        </ListItem>
      ))}
      <Typography variant='h5' sx={{ marginBottom: 3, color: '#37474F' }}>
        Developer Info:
      </Typography>
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant='body1' sx={{ marginBottom: 1 }}>
          This application is developed by <b>Muhammad Nawaz Khan</b>.
        </Typography>
        <Grid container spacing={2}>
          <Grid item sx={{ m: 1 }}>
            <Link
              href='https://github.com/Nawaz393'
              target='_blank'
              rel='noopener noreferrer'
              color='secondary'
            >
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
