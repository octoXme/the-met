import { Dialog, Slide, useMediaQuery, useTheme } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IDialogState } from '../../model/IDialog';
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
  const dispatch = useDispatch();
  const theme = useTheme();

  const state = useSelector((dialog: IDialogState) => dialog.open);
  const options = useSelector((dialog: IDialogState) => dialog.options);
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullWidth
      fullScreen={fullScreen}
      open={state}
      TransitionComponent={Transition}
      onClose={() => dispatch(closeDialog())}
      scroll='body'
      {...options}
    />
  );
};

export default DefaultDialog;
