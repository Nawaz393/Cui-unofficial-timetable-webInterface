import Layout from './Layout';
import { Route, Routes } from 'react-router-dom';
import {
  Landing,
  Teachers,
  Features,
  ClassRooms,
  Subjects,
  TimeTable,
} from './Pages';

import axios from 'axios';
import { MyProvider } from './context';
import About from './Pages/About/About';

const App = () => {
  axios.defaults.baseURL = import.meta.env.VITE_BASEURL;
  return (
    <MyProvider>
      <Routes>
        <Route path='/' element={<Layout children={<Landing />} />} />
        <Route path='/features' element={<Layout children={<Features />} />} />
        <Route path='/teachers' element={<Layout children={<Teachers />} />} />
        <Route
          path='/classroom'
          element={<Layout children={<ClassRooms />} />}
        />
        <Route path='/subjects' element={<Layout children={<Subjects />} />} />
        <Route
          path='/timetable'
          element={<Layout children={<TimeTable />} />}
        />

        <Route path='/about' element={<Layout children={<About />} />} />
        <Route path='*' element={<Layout children={<Landing />} />} />
      </Routes>
    </MyProvider>
  );
};

export default App;
