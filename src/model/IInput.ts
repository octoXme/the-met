import { SelectChangeEvent } from '@mui/material';

export interface IInputBase {
  field: { name: string; value: any };
  form: {
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean
    ) => void;
    errors?: any;
  };
  label: string;
  helperText?: string;
  [key: string]: any;
}

export interface ITextInput extends IInputBase {
  autocapitalize: boolean;
  onChange: (
    e: React.ChangeEvent<any>,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  ) => void;
}

export interface ISelectInput extends IInputBase {
  options: {
    label: string;
    value: string;
  }[];
  label: string;
  onChange: (
    e: SelectChangeEvent<any>,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  ) => void;
}

export interface ISwitch extends IInputBase {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  ) => void;
}
