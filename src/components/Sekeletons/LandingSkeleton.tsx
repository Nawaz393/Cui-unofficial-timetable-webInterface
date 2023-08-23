import { Container, Skeleton, useMediaQuery } from '@mui/material';
export const LandingSkeleton = () => {
  const isSmall = useMediaQuery('(max-width:640px)');

  return (
    <Container>
      <Skeleton variant='text' width={isSmall ? '65%' : '50%'} height={80} />
      <Skeleton variant='text' width={isSmall ? '50%' : '30%'} height={80} />
      <Skeleton variant='text' width={isSmall ? '98%' : '95%'} height={20} />
      <Skeleton variant='text' width={isSmall ? '85%' : '40%'} height={20} />
    </Container>
  );
};
