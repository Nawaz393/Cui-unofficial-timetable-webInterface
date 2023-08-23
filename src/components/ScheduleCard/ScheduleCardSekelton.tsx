import { Skeleton } from '@mui/material';
interface ScheduleCardSekeltonProps {
  isSmall: boolean;
}
export const ScheduleCardSekelton: React.FC<ScheduleCardSekeltonProps> = ({
  isSmall,
}) => {
  return (
    <div className={`grid ${!isSmall ? 'grid-cols-2' : 'grid-cols-1'}`}>
      {[1, 2, 3, 4].map((item) => (
        <Skeleton
            key={item}
          variant='rectangular'
          sx={{
            bgcolor: 'grey.300',
            borderRadius: 1,
            margin: '20px',
          }}
          height={200}
          animation={'wave'}
          width={300}
        />
      ))}
    </div>
  );
};
