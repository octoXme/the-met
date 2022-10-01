import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

import searchReducer from '../features/search/searchSlice';
import artReducer from '../features/art/artSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    search: searchReducer,
    arts: artReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
