import { createContext, useEffect, useState, useContext } from 'react';
import { MyContextType } from '.';
import { usefetch } from '../hooks';

const MyContext = createContext<MyContextType | undefined>(undefined);

interface ProviderProps {
  children: React.ReactNode;
}

export const MyProvider: React.FC<ProviderProps> = ({ children }) => {
  const [teachers, setTeachers] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [classRooms, setClassRooms] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [classNames, setClassNames] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (sessionStorage.getItem('dropdownData') === null) {
        const response = await usefetch('/');
        const { teachers, subjects, classRooms, timeSlots, classNames } =
          response.data;

        sessionStorage.setItem('dropdownData', JSON.stringify(response.data));
        setTeachers(teachers);
        setSubjects(subjects);
        setClassRooms(classRooms);
        setTimeSlots(timeSlots);
        setClassNames(classNames); // Set classNames here
      } else {
        const { teachers, subjects, classRooms, timeSlots, classNames } =
          JSON.parse(sessionStorage.getItem('dropdownData')!);
        setTeachers(teachers);
        setSubjects(subjects);
        setClassRooms(classRooms);
        setTimeSlots(timeSlots);
        setClassNames(classNames); // Set classNames here
      }
      setLoading(false);
    })();
  }, []);

  return (
    <MyContext.Provider
      value={{
        teachers,
        setTeachers,
        subjects,
        setSubjects,
        timeSlots,
        setTimeSlots,
        loading,
        setLoading,
        classNames,
        setClassNames,
        classRooms,
        setClassRooms,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};
