import { FormControlLabel, Switch } from '@mui/material';
import { ISwitch } from 'model/IInput';
import React from 'react';

export default function SwitchControl({
  onChange,
  field: { name, value },
  form: { setFieldValue },
  label,
  ...other
}: ISwitch) {
  const handleChange = (e: React.ChangeEvent<any>) => {
    setFieldValue(name, e.target.checked);
    if (onChange) {
      onChange(e.target.checked, setFieldValue);
    }
  };

  return (
    <FormControlLabel
      control={<Switch checked={value ?? false} onChange={handleChange} />}
      label={label}
      name={name}
      {...other}
    />
  );
}
