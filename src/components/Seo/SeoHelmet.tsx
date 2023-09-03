import React from 'react';
import { Helmet } from 'react-helmet';

interface HelmetProps {
  title: string;
  additionalKeywords?: string[];
  description?: string;
}

const SeoHelmet: React.FC<HelmetProps> = ({
  title,
  additionalKeywords = [],
  description = 'CUI Unofficial Time Table - Your One-Stop Solution for Accessing Class Schedules and Timetables at CUI',
}) => {
  const defaultKeywords = [
    'CUI Unofficial Time Table',
    'CUI Timetable',
    'CUI Class Schedule',
    'Abbotabbad Time Table',
    'CUI Unofficial',
    'Time Table Management',
    `cui atd timetable ${new Date().getFullYear()}`,
    'cui atd timetable',
    'cui atd time table',
  ];

  const combinedKeywords = [...defaultKeywords, ...additionalKeywords].join(
    ', ',
  );

  return (
    <Helmet>
      <title>{title}</title>
      <meta name='keywords' content={combinedKeywords} />
      <meta name='description' content={description} />
    </Helmet>
  );
};

export default SeoHelmet;
