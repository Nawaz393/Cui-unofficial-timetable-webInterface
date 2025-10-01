import { Container, Box, Typography, Grid, Divider } from '@mui/material';
import ButtonCard from './Card';
import ButtonCardData from './CardData';
import { FeaturesSkeleton } from '../../components';
import { useMyContext } from '../../context';
import SeoHelmet from '../../components/Seo/SeoHelmet';

export const Features = () => {
  const { loading } = useMyContext();

  return (
    <>
      <SeoHelmet
        title='Features - CUI Timetable'
        description='Discover the powerful features of the CUI Timetable platform — from teacher schedules and student views to room tracking and subject-wise management.'
        additionalKeywords={[
          'CUI Timetable features',
          'class schedules',
          'room management',
          'teacher assignments',
          'subject schedules',
          'college timetable',
        ]}
      />

      {/* Hero Section */}
  

      {/* Feature Cards */}
      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={4}>
          {ButtonCardData?.map((item) =>
            !loading ? (
              <Grid item xs={12} sm={6} md={4} key={item.name}>
                <ButtonCard
                  name={item.name}
                  icon={item.icon}
                  link={item.link}
                  description={item.description}
                />
              </Grid>
            ) : (
              <Grid item xs={12} sm={6} md={4} key={item.name}>
                <FeaturesSkeleton />
              </Grid>
            ),
          )}
        </Grid>
      </Container>

      {/* Long-form Descriptive Content */}
      <Box sx={{ bgcolor: '#f9fafc', py: 10 }}>
        <Container maxWidth='lg'>
          <Typography
            variant='h3'
            component='h2'
            align='center'
            fontWeight='bold'
            gutterBottom
          >
            How CUI Timetable Helps You Stay Organized
          </Typography>
          <Typography
            variant='h6'
            align='center'
            color='text.secondary'
            sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}
          >
            Our features go beyond basic timetable display. We’ve built a
            platform that empowers everyone on campus — from students looking
            for their next class to administrators managing the entire schedule.
          </Typography>

          <Divider sx={{ my: 6 }} />

          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Typography variant='h5' fontWeight='bold' gutterBottom>
                For Students
              </Typography>
              <Typography
                variant='body1'
                color='text.secondary'
                sx={{ lineHeight: 1.8 }}
              >
                Students can easily check their daily, weekly, or semester-long
                timetables. With powerful search tools, they can quickly find
                out where a class is being held, which teacher is assigned to
                each subject, and what room is occupied at any given time.
                Notifications about timetable changes ensure they are never
                caught off guard.
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant='h5' fontWeight='bold' gutterBottom>
                For Teachers
              </Typography>
              <Typography
                variant='body1'
                color='text.secondary'
                sx={{ lineHeight: 1.8 }}
              >
                Teachers gain a centralized view of all their classes, subjects,
                and room allocations. The platform makes it easy to avoid
                scheduling conflicts and track availability of rooms and time
                slots. Teachers can better plan lessons and communicate schedule
                updates.
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant='h5' fontWeight='bold' gutterBottom>
                For Administrators
              </Typography>
              <Typography
                variant='body1'
                color='text.secondary'
                sx={{ lineHeight: 1.8 }}
              >
                Administrators can maintain a unified timetable across all
                departments. They can monitor room utilization, assign teachers
                to subjects efficiently, and publish updates that are instantly
                reflected across the platform. This transparency saves hours of
                coordination every semester.
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant='h5' fontWeight='bold' gutterBottom>
                Future-Ready Scheduling
              </Typography>
              <Typography
                variant='body1'
                color='text.secondary'
                sx={{ lineHeight: 1.8 }}
              >
                The system is built to adapt as your institution grows. Features
                like smart conflict detection, live updates, and data-driven
                reporting ensure you always have an optimized and up-to-date
                timetable.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Closing Section */}
      <Box
        sx={{
          bgcolor: '#00396b',
          py: 8,
          textAlign: 'center',
          color: 'white',
        }}
      >
        <Container maxWidth='md'>
          <Typography variant='h4' fontWeight='bold'>
            Start Exploring Our Features Today
          </Typography>
          <Typography variant='body1' sx={{ mt: 2, mb: 4, opacity: 0.9 }}>
            Our rich set of features is designed to simplify campus scheduling
            for everyone. Get started and see how CUI Timetable transforms your
            experience.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Features;
