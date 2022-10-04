import { TextField } from '@mui/material';
import { ITextInput } from 'model/IInput';
import React from 'react';

function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export default function TextInput({
  onChange,
  label,
  field: { name, value },
  form: { setFieldValue, errors },
  autocapitalize,
  helperText,
  ...other
}: ITextInput) {
  const handleChange = (e: React.ChangeEvent<any>) => {
    const str = e.target.value;
    const val = autocapitalize ? toTitleCase(str) : str;

    setFieldValue(name, val);
    if (onChange) {
      onChange(val, setFieldValue);
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
      helperText={fieldError || helperText}
      {...other}
    />
  );
}
