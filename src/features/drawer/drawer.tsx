import React from 'react';
import { closeDrawer } from 'features/drawer/drawerSlice';
import { CloseIcon } from 'components/icons';
import IconButton from 'components/iconButton';
import { makeStyles } from 'tss-react/mui';
import { Box, Drawer, styled, Theme } from '@mui/material';
import { RootState } from 'app/store';
import { useAppDispatch, useAppSelector } from 'app/hooks';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  justifyContent: 'space-between',
  ...theme.mixins.toolbar,
}));

const useStyles = makeStyles<{ width: number }>()(
  (theme: Theme, { width }) => ({
    drawerPaper: {
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: width,
      },
    },
    content: {
      padding: theme.spacing(3),
      flex: 1,
    },
  })
);

const DefaultDrawer = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(({ drawer }: RootState) => drawer.open);
  const options = useAppSelector(({ drawer }: RootState) => drawer.options);
  const { classes } = useStyles({ width: options?.width || 0 });

  const handleClose = (_event: any, reason: string) => {
    if (options?.onClose) {
      options.onClose();
    }
    if (reason === 'backdropClick' && options.disableBackdropClick) return;
    if (reason === 'escapeKeyDown' && options.disableEscapeKeyDown) return;
    dispatch(closeDrawer());
  };

  return (
    <Drawer
      anchor={options?.anchor}
      open={state || false}
      onClose={handleClose}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <DrawerHeader>
        <IconButton onClick={handleClose} icon={<CloseIcon />} title='Close' />
        {options?.header && <Box mx={2}>{options.header}</Box>}
      </DrawerHeader>
      <div className={classes.content}>{options?.children}</div>
    </Drawer>
  );
};

export default DefaultDrawer;
