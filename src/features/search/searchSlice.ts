import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { chunk, size } from 'lodash';
import { RootState } from '../../app/store';
import {
  IResult,
  ISearchParam,
  ISearchResult,
  ISearchState,
} from '../../model/ISearch';
import { fetchSearchAPI } from './searchAPI';

export const DEFAULT_PAGE_SIZE = 5;

export const initialState: ISearchState = {
  entities: [],
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
    const result = await fetchSearchAPI(params);
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

        state.pageInfo = {
          pageNumber: payload.pageNumber,
          pageSize: payload.pageSize,
          totalNumber: payload.total,
          totalPages: size(splitTotal),
        };
      })
      .addCase(fetchArts.rejected, (state, { error }) => {
        state.status = 'failed';
        state.entities = [];
        state.error = error.message || 'Something went wrong!';
      });
  },
});

export const { resetSearch } = SearchSlice.actions;

export const getSearchStatus = (state: RootState) => state.search.status;

export const getSearchParams = (state: RootState) => state.search.searchParams;

export const getPageInfo = (state: RootState) => state.search.pageInfo;

export const getSearchResults = (state: RootState): number[] => {
  const pageNumber = state.search.pageInfo.pageNumber + 1;
  const results = state.search.entities.slice(
    0,
    pageNumber * DEFAULT_PAGE_SIZE
  );

  return results;
};

export default SearchSlice.reducer;
