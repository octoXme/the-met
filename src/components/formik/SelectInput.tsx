import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { ISelectInput } from 'model/IInput';

export default function SelectInput({
  field: { name, value },
  form: { setFieldValue },
  onChange,
  options,
  label,
  ...other
}: ISelectInput) {
  const handleChange = (e: SelectChangeEvent<any>) => {
    setFieldValue(name, e.target.value);
    if (onChange) {
      onChange(e.target.value, setFieldValue);
    }
  };

  if (!options.length) return null;

  return (
    <FormControl>
      <InputLabel sx={{ background: '#fff' }}>{label}</InputLabel>
      <Select
        name={name}
        value={value || ''}
        onChange={handleChange}
        {...other}
      >
        <MenuItem value=''>None</MenuItem>
        {options.map((option) => (
          <MenuItem sx={{ p: 1 }} key={option?.value} value={option?.value}>
            {option?.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
