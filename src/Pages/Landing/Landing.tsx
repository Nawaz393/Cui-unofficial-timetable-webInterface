import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { LandingSkeleton } from '../../components';
import { useMyContext } from '../../context';
import SeoHelmet from '../../components/Seo/SeoHelmet';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  School as SchoolIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Room as RoomIcon,
  Search as SearchIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';
import { Home, School, User } from 'lucide-react';

// import timeline icon from lucide-react
export const Landing = (): ReactNode => {
  const { loading, classNames, classRooms, teachers } = useMyContext();

  if (loading) {
    return (
      <Box sx={{ py: 10 }}>
        <LandingSkeleton />
      </Box>
    );
  }

  return (
    <>
      <SeoHelmet
        title="Home - CUI Timetable"
        description="CUI Timetable helps students and teachers easily view, manage and plan their daily, weekly and semester schedules. Explore class, teacher and room timetables with ease."
        additionalKeywords={[
          'CUI timetable',
          'class schedule',
          'teacher schedule',
          'room booking',
          'subject schedule',
          'college timetable manager',
          'daily class finder',
        ]}
      />

      {/* HERO SECTION */}
      <Box
        sx={{

          py: { xs: 2, md: 4 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                fontWeight="bold"
                gutterBottom
                sx={{ lineHeight: 1.2,fontSize:{xs:'1.5rem',sm:'2.5rem',md:'3rem'} }}
              >
                Smarter Timetable Management
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
                CUI Timetable is your one-stop solution for exploring teacher
                schedules, class timetables, room usage, and subject
                assignments. Empower your campus with organized schedules.
              </Typography>
              <Button
  component={Link}
  to="/features"
  size="large"
  sx={{
    background: "linear-gradient(90deg, #00396b, #0066cc)",
    color: "white",
    fontWeight: "bold",
    px: 5,
    py: 1.5,
    borderRadius: 3,
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
    "&:hover": {
      background: "linear-gradient(90deg, #002c4d, #005bb5)",
      transform: "translateY(-3px)",
      boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
    },
  }}
>
  🚀 Explore Features
</Button>

            </Grid>


          </Grid>
        </Container>
      </Box>

      {/* LIVE STATS */}
<Container sx={{ py: 6 }}>
  <Grid container spacing={4} justifyContent="center">
    {[
      { title: "Total Rooms", value: classRooms?.length || 0, icon: <Home size={32} /> },
      { title: "Total Teachers", value: teachers?.length || 0, icon: <User  size={32} /> },
      { title: "Total Classes", value: classNames?.length || 0, icon: <School size={32} /> },
    ].map((stat, idx) => (
      <Grid item xs={12} sm={4} key={idx}>
        <Card
          sx={{
            textAlign: "center",
            borderRadius: 4,
            boxShadow: 3,
            p: 3,
            transition: "transform 0.2s",
            "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
          }}
        >
          <Box display="flex" justifyContent="center" mb={2} color="primary.main">
            {stat.icon}
          </Box>
          <Typography variant="h4" fontWeight="bold">
            {stat.value}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {stat.title}
          </Typography>
        </Card>
      </Grid>
    ))}
  </Grid>
</Container>


      {/* PLATFORM BENEFITS */}
      <Box sx={{ bgcolor: '#f9fafc', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            All-in-One Campus Scheduling
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ maxWidth: 800, mx: 'auto', mb: 6 }}
          >
            Our platform brings transparency and ease to campus scheduling.
            Whether you are a student, teacher, or administrator, CUI Timetable
            keeps you informed about classes, rooms, and subjects in real-time.
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                icon: <PersonIcon fontSize="large" color="primary" />,
                title: 'Teacher Schedules',
                desc: 'Easily find when and where any teacher is conducting a class. Perfect for students and staff to stay in sync.',
              },
              {
                icon: <SchoolIcon fontSize="large" color="primary" />,
                title: 'Student-Friendly Views',
                desc: 'Students can log in to instantly see their complete daily and weekly class plans without confusion.',
              },
              {
                icon: <RoomIcon fontSize="large" color="primary" />,
                title: 'Room Occupancy',
                desc: 'Check which classes are happening in any specific room. Avoid clashes and optimize room usage.',
              },
              {
                icon: <CalendarIcon fontSize="large" color="primary" />,
                title: 'Subject-wise Tracking',
                desc: 'Quickly learn who is teaching a particular subject and where it is scheduled.',
              },
              {
                icon: <SearchIcon fontSize="large" color="primary" />,
                title: 'Real-time Search',
                desc: 'Search for teachers, subjects, rooms, or classes in seconds using our powerful integrated search.',
              },
              {
                icon: <TimeIcon fontSize="large" color="primary" />,
                title: 'Up-to-Date Timetables',
                desc: 'No more outdated PDFs. Get instant updates for timetable changes as they happen.',
              },
            ].map((feature, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card
                  sx={{
                    height: '100%',
                    boxShadow: 3,
                    borderRadius: 3,
                    textAlign: 'center',
                    p: 2,
                    transition: 'all 0.3s',
                    '&:hover': { boxShadow: 6, transform: 'translateY(-4px)' },
                  }}
                >
                  <CardContent>
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      gutterBottom
                      color="primary"
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* LONG-FORM CONTENT FOR SEO */}
      <Container sx={{ py: 10 }}>
        <Typography
          variant="h3"
          component="h2"
          fontWeight="bold"
          gutterBottom
          align="center"
        >
          Why Choose CUI Timetable
        </Typography>
        <Typography
          variant="body1"
          sx={{ maxWidth: 900, mx: 'auto', lineHeight: 1.8, mb: 6 }}
          color="text.secondary"
        >
          Managing timetables in a busy academic environment is often a
          challenge. CUI Timetable is designed to eliminate the hassle of manual
          scheduling and give everyone access to reliable, up-to-date
          information. Teachers can plan their lectures better, students save
          time by checking their schedules online, and administrators benefit
          from centralized control of all timetable data.
          <br />
          <br />
          Our platform also supports search engine visibility with rich
          descriptions, structured data, and relevant keywords — enabling you to
          monetize your platform effectively. By offering informative,
          easy-to-read pages like this, your site becomes more ad-friendly and
          valuable for visitors.
        </Typography>

        <Divider sx={{ my: 6 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              For Students
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Students can access their complete schedule, including daily and
              weekly views. They can also search for any subject or teacher to
              know when and where the class is happening. This saves time,
              reduces stress, and helps them stay organized.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              For Teachers
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Teachers can check their own timetables and quickly view the
              availability of rooms or the timing of specific courses. This
              feature helps them avoid conflicts and plan their week more
              efficiently.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* CALL TO ACTION */}
      <Box sx={{ bgcolor: '#00396b', py: 8, textAlign: 'center', color: 'white' }}>
        <Container>
          <Typography variant="h4" fontWeight="bold">
            Ready to Simplify Your Campus Scheduling?
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, mb: 4, maxWidth: 600, mx: 'auto' }}>
            Join thousands of students and teachers already using CUI Timetable
            to save time and stay organized.
          </Typography>
          <Button
            component={Link}
            to="/features"
            variant="contained"
            sx={{
              bgcolor: 'white',
              color: '#00396b',
              px: 5,
              fontWeight: 'bold',
              '&:hover': { bgcolor: '#f0f0f0' },
            }}
          >
            Get Started Now
          </Button>
        </Container>
      </Box>
    </>
  );
};
