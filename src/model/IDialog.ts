import { Breakpoint } from '@mui/material';

export interface IDialogState {
  open: boolean;
  options: {
    children: React.ReactElement | undefined;
    maxWidth: Breakpoint | false;
  };
}
