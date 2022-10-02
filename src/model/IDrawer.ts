import React from 'react';

export interface IDrawerState {
  open: boolean;
  options: {
    anchor: 'left' | 'right' | 'top' | 'bottom';
    width: number;
    disableBackdropClick: boolean;
    disableEscapeKeyDown: boolean;
    onClose?: () => void;
    header: string | undefined;
    children: React.ReactElement | undefined;
  };
}
