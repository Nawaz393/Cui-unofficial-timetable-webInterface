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
  Paper,
  Divider,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import { BsEnvelope, BsGithub, BsLinkedin } from 'react-icons/bs';
import { FaCheckCircle, FaRocket, FaUsers, FaShieldAlt } from 'react-icons/fa';
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
    'Push notifications for class reminders',
    'Export schedules to calendar apps',
    'Collaborative study group finder',
  ];

  const statistics = [
    { label: 'Active Users', value: '5,000+', icon: <FaUsers /> },
    { label: 'Schedules Viewed', value: '50,000+', icon: <FaCheckCircle /> },
    { label: 'Time Saved (hrs)', value: '10,000+', icon: <FaRocket /> },
  ];

  return (
    <Container maxWidth='lg' sx={{ marginTop: 2, padding: 3 }}>
      <SeoHelmet
        title='About CUI Timetable - Your Academic Companion'
        description='Learn about the CUI Timetable application, its features, and how it helps thousands of students stay organized. Join our community of productive students today!'
        additionalKeywords={[
          'About',
          'CUI About',
          'CUI Schedule Management',
          'Student Productivity',
          'Academic Planning Tool',
          'University Timetable',
          'Class Organization',
          'Education Technology',
        ]}
      />

      {/* Hero Section */}
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          marginBottom: 4,
          background: 'linear-gradient(135deg, #283593 0%, #3949AB 100%)',
          color: 'white',
          borderRadius: 3,
        }}
      >
        <Typography
          variant='h1'
          sx={{
            marginBottom: 2,
            fontFamily: 'Montserrat, sans-serif',
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 700,
          }}
        >
          About CUI Unofficial Timetable
        </Typography>
        <Typography variant='h6' sx={{ marginBottom: 2, opacity: 0.95 }}>
          Your Ultimate Academic Schedule Companion
        </Typography>
        <Typography variant='body1' sx={{ maxWidth: '800px', opacity: 0.9 }}>
          Discover an intuitive, powerful, and completely free way to access and
          manage class schedules at COMSATS University Islamabad. Join thousands
          of students who have transformed their academic planning experience.
        </Typography>
      </Paper>

      {/* Statistics Section */}
      <Grid container spacing={3} sx={{ marginBottom: 4 }}>
        {statistics.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card
              elevation={2}
              sx={{
                textAlign: 'center',
                padding: 3,
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-5px)' },
              }}
            >
              <Box
                sx={{ fontSize: '2.5rem', color: '#283593', marginBottom: 1 }}
              >
                {stat.icon}
              </Box>
              <Typography
                variant='h4'
                sx={{ fontWeight: 700, color: '#283593' }}
              >
                {stat.value}
              </Typography>
              <Typography variant='body2' sx={{ color: '#666' }}>
                {stat.label}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Key Features Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography
          variant='h4'
          sx={{
            marginBottom: 3,
            color: '#283593',
            fontWeight: 600,
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          🎯 Key Features
        </Typography>
        <Grid container spacing={2}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper
                elevation={1}
                sx={{
                  padding: 2,
                  borderRadius: 2,
                  backgroundColor: '#F5F7FA',
                  transition: 'all 0.3s',
                  '&:hover': {
                    backgroundColor: '#E8EAF6',
                    transform: 'translateX(5px)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FaCheckCircle
                    style={{
                      color: '#4CAF50',
                      marginRight: '12px',
                      fontSize: '1.2rem',
                    }}
                  />
                  <Typography
                    variant='body1'
                    sx={{ color: '#333', fontWeight: 500 }}
                  >
                    {feature}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Mission Statement */}
      <Paper
        elevation={2}
        sx={{
          padding: 4,
          marginBottom: 4,
          backgroundColor: '#FFFDE7',
          borderLeft: '5px solid #FBC02D',
          borderRadius: 2,
        }}
      >
        <Typography
          variant='h5'
          sx={{ marginBottom: 2, color: '#F57F17', fontWeight: 600 }}
        >
          Our Mission
        </Typography>
        <Typography variant='body1' sx={{ color: '#555', lineHeight: 1.8 }}>
          We're dedicated to empowering students with tools that simplify
          academic life. Our goal is to save you time, reduce scheduling
          conflicts, and help you focus on what truly matters - your education
          and personal growth. This platform is built by students, for students,
          with a commitment to remaining{' '}
          <strong>free and accessible to all</strong>.
        </Typography>
      </Paper>

      {/* Upcoming Features Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography
          variant='h4'
          sx={{
            marginBottom: 3,
            color: '#283593',
            fontWeight: 600,
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          🚀 Upcoming Advanced Features
        </Typography>
        <Grid container spacing={2}>
          {upcomingFeatures.map((feature, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card
                elevation={2}
                sx={{
                  background:
                    'linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%)',
                  color: 'white',
                  borderRadius: 2,
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.02)' },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FaRocket
                      style={{ marginRight: '12px', fontSize: '1.5rem' }}
                    />
                    <Typography variant='body1' sx={{ fontWeight: 600 }}>
                      {feature}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Privacy & Data Section */}
      <Paper
        elevation={2}
        sx={{
          padding: 4,
          marginBottom: 4,
          backgroundColor: '#E3F2FD',
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <FaShieldAlt
            style={{ color: '#1976D2', fontSize: '2rem', marginRight: '12px' }}
          />
          <Typography variant='h5' sx={{ color: '#1565C0', fontWeight: 600 }}>
            Your Privacy Matters
          </Typography>
        </Box>
        <Typography
          variant='body1'
          sx={{ color: '#555', marginBottom: 2, lineHeight: 1.8 }}
        >
          We respect your privacy and are committed to protecting your data:
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText
              primary='• No personal information is collected or stored'
              sx={{ color: '#333' }}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary='• All schedule data is publicly available information'
              sx={{ color: '#333' }}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary='• No tracking or third-party analytics'
              sx={{ color: '#333' }}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary='• Open-source and transparent development'
              sx={{ color: '#333' }}
            />
          </ListItem>
        </List>
      </Paper>

      {/* Support Section */}
      <Paper
        elevation={2}
        sx={{
          padding: 4,
          marginBottom: 4,
          backgroundColor: '#F3E5F5',
          borderRadius: 2,
        }}
      >
        <Typography
          variant='h5'
          sx={{ marginBottom: 2, color: '#6A1B9A', fontWeight: 600 }}
        >
          Support Our Development
        </Typography>
        <Typography
          variant='body1'
          sx={{ color: '#555', marginBottom: 2, lineHeight: 1.8 }}
        >
          This project is developed and maintained independently with a passion
          for improving student life. While the app is free to use, you can
          support continued development and new features:
        </Typography>
        <Box sx={{ marginTop: 2 }}>
          <Chip
            label='⭐ Star us on GitHub'
            sx={{ margin: 0.5, backgroundColor: '#283593', color: 'white' }}
          />
          <Chip
            label='📢 Share with friends'
            sx={{ margin: 0.5, backgroundColor: '#4CAF50', color: 'white' }}
          />
          <Chip
            label='💡 Suggest features'
            sx={{ margin: 0.5, backgroundColor: '#FF9800', color: 'white' }}
          />
          <Chip
            label='🐛 Report bugs'
            sx={{ margin: 0.5, backgroundColor: '#F44336', color: 'white' }}
          />
        </Box>
      </Paper>

      <Divider sx={{ marginY: 4 }} />

      {/* Developer Info Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography
          variant='h4'
          sx={{
            marginBottom: 3,
            color: '#283593',
            fontWeight: 600,
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          👨‍💻 Developer Information
        </Typography>
        <Paper elevation={2} sx={{ padding: 4, borderRadius: 2 }}>
          <Typography
            variant='body1'
            sx={{ marginBottom: 2, color: '#555', lineHeight: 1.8 }}
          >
            This application is independently developed and maintained by{' '}
            <strong style={{ color: '#283593' }}>Muhammad Nawaz Khan</strong>, a
            passionate developer committed to creating tools that enhance
            student productivity and academic success.
          </Typography>
          <Typography variant='body2' sx={{ marginBottom: 3, color: '#777' }}>
            Connect with me for feedback, suggestions, or collaboration
            opportunities:
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
              <Link
                href='https://github.com/Nawaz393'
                target='_blank'
                rel='noopener noreferrer'
                sx={{ textDecoration: 'none' }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    padding: 2,
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.3s',
                    '&:hover': {
                      backgroundColor: '#333',
                      color: 'white',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <BsGithub size='1.5em' style={{ marginRight: '8px' }} />
                  <Typography variant='body2'>GitHub</Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item>
              <Link
                href='mailto:mohdnawaz6393@gmail.com'
                sx={{ textDecoration: 'none' }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    padding: 2,
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.3s',
                    '&:hover': {
                      backgroundColor: '#D32F2F',
                      color: 'white',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <BsEnvelope size='1.5em' style={{ marginRight: '8px' }} />
                  <Typography variant='body2'>Email</Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item>
              <Link
                href='http://linkedin.com/in/muhammad-nawaz-khan-69048724b/'
                target='_blank'
                rel='noopener noreferrer'
                sx={{ textDecoration: 'none' }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    padding: 2,
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.3s',
                    '&:hover': {
                      backgroundColor: '#0A66C2',
                      color: 'white',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <BsLinkedin size='1.5em' style={{ marginRight: '8px' }} />
                  <Typography variant='body2'>LinkedIn</Typography>
                </Paper>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Footer Note */}
      <Box
        sx={{
          textAlign: 'center',
          padding: 3,
          backgroundColor: '#FAFAFA',
          borderRadius: 2,
        }}
      >
        <Typography variant='body2' sx={{ color: '#777', marginBottom: 1 }}>
          Made with ❤️ for COMSATS University Islamabad Abbottabad Campus
          Students
        </Typography>
        <Typography variant='caption' sx={{ color: '#999' }}>
          © 2023 CUI Unofficial Timetable. This is an independent project and is
          not officially affiliated with COMSATS University Islamabad.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
