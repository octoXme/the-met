import { createSlice } from '@reduxjs/toolkit';
import { IDialogState } from 'model/IDialog';

export const initialState: IDialogState = {
  open: false,
  options: {
    children: undefined,
    maxWidth: 'sm',
  },
};

export const DialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog: (state, action) => {
      state.open = true;
      state.options = { ...initialState.options, ...action.payload };
    },
    closeDialog: (state) => {
      state.open = false;
      state.options = initialState.options;
    },
  },
});

export const { openDialog, closeDialog } = DialogSlice.actions;

export default DialogSlice.reducer;
