import { Button, CircularProgress } from '@mui/material';
import React from 'react';
import { makeStyles } from 'tss-react/mui';

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

const useStyles = makeStyles()(() => ({
  root: {
    borderRadius: 4,
  },
}));

export default function DefaultButton({
  loading,
  icon,
  color = 'secondary',
  children,
  ...other
}: IDefaultButton) {
  const { classes } = useStyles();

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
    <Button
      className={classes.root}
      color={color}
      startIcon={startIcon()}
      {...other}
    >
      {children}
    </Button>
  );
}
