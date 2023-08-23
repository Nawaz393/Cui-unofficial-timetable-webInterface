import { Skeleton, useMediaQuery } from '@mui/material';

export const FeaturesSkeleton = () => {
  const isSmall=useMediaQuery('(max-width:640px)')
  return <Skeleton variant='rectangular' width={'100%'} height={isSmall?120:180} />;
};
