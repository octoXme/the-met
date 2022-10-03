import { TextField } from '@mui/material';
import { ITextInput } from 'model/IInput';
import React from 'react';

const TextInput = ({
  onChange,
  label,
  field: { name, value },
  form: { setFieldValue, errors },
  ...other
}: ITextInput) => {
  const handleChange = (e: React.ChangeEvent<any>) => {
    setFieldValue(name, e.target.value);
    if (onChange) {
      onChange(e.target.value, setFieldValue);
    }
  };

  const handleBlur = () => {
    // trim white space on input blur
    setFieldValue(name, value?.trim());
  };

  const fieldError = errors?.[name];

  return (
    <TextField
      name={name}
      label={label}
      value={value ?? ''}
      onChange={handleChange}
      onBlur={handleBlur}
      error={!!fieldError}
      helperText={fieldError}
      {...other}
    />
  );
};

export default TextInput;
