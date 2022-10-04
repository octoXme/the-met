import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { IArtState } from '../../model/IArtObject';
import { fetchArtObjectByIdAPI } from './artAPI';

export const initialState: IArtState = {
  entities: undefined,
  status: 'idle',
};

export const fetchArtById = createAsyncThunk(
  'search/fetchArt',
  async (id: number) => {
    const response = await fetchArtObjectByIdAPI(id);
    return await response.json();
  }
);

export const artSlice = createSlice({
  name: 'arts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtById.pending, (state, { meta, payload }) => {
        state.status = 'loading';

        state.entities = {
          ...state.entities,
          [meta.arg]: {
            status: 'loading',
            error: '',
            data: undefined,
          },
        };
      })
      .addCase(fetchArtById.fulfilled, (state, { meta, payload }) => {
        state.status = 'idle';
        state.entities = {
          ...state.entities,
          [meta.arg]: {
            status: 'idle',
            error: '',
            data: payload,
          },
        };
      })
      .addCase(fetchArtById.rejected, (state, { meta, error }) => {
        state.status = 'failed';
        state.entities = {
          ...state.entities,
          [meta.arg]: {
            status: 'failed',
            error: error.message || 'Something went wrong :(',
            date: undefined,
          },
        };
      });
  },
});

export const getArtworkByIdLoading = (id: number) => (state: RootState) =>
  state.art.entities?.[id]?.status === 'loading';

export const getArtworkById = (id: number) => (state: RootState) =>
  state.art.entities?.[id];

export default artSlice.reducer;
