import { Dialog, Slide, useMediaQuery, useTheme } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import React from 'react';
import { closeDialog } from './dialogSlice';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return (
    <Slide mountOnEnter unmountOnExit direction='up' ref={ref} {...props} />
  );
});

const DefaultDialog = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const state = useAppSelector(({ dialog }: RootState) => dialog.open);
  const options = useAppSelector(({ dialog }: RootState) => dialog.options);
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullWidth
      fullScreen={fullScreen}
      open={state || false}
      TransitionComponent={Transition}
      onClose={() => dispatch(closeDialog())}
      scroll='body'
      {...options}
    />
  );
};

export default DefaultDialog;
