import { Container } from '@mui/material';
import ButtonCard from './Card';
import ButtonCardData from './CardData';
import { FeaturesSkeleton } from '../../components';
import { useMyContext } from '../../context';
import SeoHelmet from '../../components/Seo/SeoHelmet';
export const Features = () => {
  const { loading } = useMyContext();





  return (
    <Container>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 mb-20'>

        <SeoHelmet

         title='Features'

          additionalKeywords={[
            'Features',
            'Cui Features',
            'Cui Features Schedule',
            'Cui Features TimeTable',
            'Cui Features Class Schedule',
            'Cui Features Class TimeTable',
            'Cui Features Class Schedule',
          ]}/>
        {ButtonCardData?.map((item) =>
          !loading ? (
            <ButtonCard
              key={item.name}
              name={item.name}
              icon={item.icon}
              link={item.link}
              description={item.description}
            />
          ) : (
            <FeaturesSkeleton key={item.name} />
          ),
        )}
      </div>
    </Container>
  );
};


