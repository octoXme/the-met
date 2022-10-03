// GET LIST OF OBJECT SPLIT INTO 20 THEN FETCH THE 20 OBJECT

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { chunk, reduce, size } from 'lodash';
import { RootState } from '../../app/store';
import {
  IResult,
  ISearchParam,
  ISearchResult,
  ISearchState,
} from '../../model/ISearch';
import { fetchSearchResults } from './searchAPI';

const DEFAULT_PAGE_SIZE = 4;

export const initialState: ISearchState = {
  entities: [],
  pages: undefined,
  status: 'idle',
  error: '',
  pageInfo: {
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber: 0,
    totalNumber: 0,
    totalPages: 0,
  },
  searchParams: {
    q: '',
    isHighlight: false,
    title: '',
    tags: false,
    departmentId: '',
    isOnView: false,
    artistOrCulture: false,
    medium: '',
    geoLocation: '',
    dateBegin: '',
    dateEnd: '',
  },
};

export const fetchArts = createAsyncThunk(
  'search/fetchArts',
  async ({
    pageNumber,
    pageSize,
    params,
  }: {
    pageNumber: number;
    pageSize: number;
    params: ISearchParam;
  }): Promise<ISearchResult> => {
    const result = await fetchSearchResults(params);
    const data: IResult = await result.json();

    return {
      pageNumber,
      pageSize,
      params,
      total: data?.total,
      objectIDs: data?.objectIDs,
    };
  }
);

export const SearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    resetSearch: (state) => (state = initialState),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArts.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchArts.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.searchParams = payload.params;
        state.entities = payload.objectIDs;
        const splitTotal = chunk(payload.objectIDs, payload.pageSize);
        const pages = reduce(
          splitTotal,
          (result, value, key) => {
            return {
              ...result,
              [key]: value,
            };
          },
          {}
        );
        state.pages = pages;
        state.pageInfo = {
          pageNumber: payload.pageNumber,
          pageSize: payload.pageSize,
          totalNumber: payload.total,
          totalPages: size(pages),
        };
      })
      .addCase(fetchArts.rejected, (state, { payload, meta, error }) => {
        state.status = 'failed';
        state.entities = [];
        state.error = error.message || 'Something went wrong!';
      });
  },
});

export const { resetSearch } = SearchSlice.actions;

export const getSearchStatus = (state: RootState) => state.search.status;

export const getSearchParams = (state: RootState) => state.search.searchParams;

export default SearchSlice.reducer;
