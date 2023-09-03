import { Autocomplete, TextField } from '@mui/material';

interface AutoCompleteDropDownProps {
  options: string[];
  OnClick: (value: string) => void;
  title: string;
  className?: string;
}
export const AutoCompleteDropDown: React.FC<AutoCompleteDropDownProps> = ({
  options,
  OnClick,
  title,
  className,
}) => {
  return (
    <Autocomplete
      id='combo-box-demo'
      onChange={
        async (e, value) => {
        e.preventDefault();
        if (value !== null) {
          OnClick(value);
        } else {
          OnClick('');
        }
      }}
      options={options}
      className={className}
      sx={{ width: 300, mr: 'auto', ml: 'auto', mt: 5 }}
      renderInput={(params) => <TextField {...params} label={title} />}
    />
  );
};
