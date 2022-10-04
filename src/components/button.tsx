import { Button, CircularProgress } from '@mui/material';
import React from 'react';

interface IDefaultButton {
  loading?: boolean;
  icon?: React.ReactElement;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | undefined;
  [key: string]: any;
}

export default function DefaultButton({
  loading,
  icon,
  color = 'secondary',
  children,
  ...other
}: IDefaultButton) {
  const startIcon = () => {
    if (loading) {
      return <CircularProgress size={24} color={color} />;
    }
    if (icon) {
      return icon;
    }
    return null;
  };

  return (
    <Button color={color} startIcon={startIcon()} {...other}>
      {children}
    </Button>
  );
}
