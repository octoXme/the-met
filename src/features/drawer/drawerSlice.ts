import { createSlice } from '@reduxjs/toolkit';
import { IDrawerState } from '../../model/IDrawer';

export const initialState: IDrawerState = {
  open: false,
  options: {
    anchor: 'right',
    width: 480,
    disableBackdropClick: false,
    disableEscapeKeyDown: false,
    header: undefined,
    children: undefined,
  },
};

export const DrawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    openDrawer: (state, action) => {
      console.log('hahahhhahhaha');
      state.open = true;
      state.options = { ...initialState.options, ...action.payload };
    },
    closeDrawer: (state) => {
      state.open = false;
      state.options = initialState.options;
    },
  },
});

export const { openDrawer, closeDrawer } = DrawerSlice.actions;

export default DrawerSlice.reducer;
