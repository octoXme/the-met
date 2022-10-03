import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import { ISelectInput } from 'model/IInput';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchDepartments, getDepartments } from './departmentSlice';

export default function DepartmentInput({
  field: { name, value },
  form: { setFieldValue },
  onChange,
  ...other
}: ISelectInput) {
  const dispatch = useAppDispatch();
  const departments = useSelector(getDepartments);

  useEffect(() => {
    if (!departments) {
      dispatch(fetchDepartments());
    }
  }, [departments, dispatch]);

  const handleChange = (e: SelectChangeEvent<any>) => {
    setFieldValue(name, e.target.value);
    if (onChange) {
      onChange(e.target.value, setFieldValue);
    }
  };

  if (!departments) return null;

  return (
    <FormControl>
      <InputLabel>Department</InputLabel>
      <Select
        name={name}
        value={value || ''}
        onChange={handleChange}
        {...other}
      >
        <MenuItem value=''>None</MenuItem>
        {Object.keys(departments).map((key: string, index) => {
          const item = departments[index];
          if (!item) return undefined;
          return (
            <MenuItem key={key} value={item.departmentId}>
              {item.displayName}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
