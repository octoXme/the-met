import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import searchReducer from '../features/search/searchSlice';
import artReducer from '../features/art/artSlice';
import departmentReducer from '../features/department/departmentSlice';
import dialogReducer from '../features/dialog/dialogSlice';
import drawerReducer from 'features/drawer/drawerSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    art: artReducer,
    department: departmentReducer,
    dialog: dialogReducer,
    drawer: drawerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
