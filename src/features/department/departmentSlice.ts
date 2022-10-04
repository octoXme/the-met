import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { mapKeys } from 'lodash';
import { IDepartmentResult, IDepartmentSate } from '../../model/IDepartment';
import { fetchDepartmentsAPI } from './departmentAPI';

export const initialState: IDepartmentSate = {
  status: 'idle',
  error: '',
  entities: undefined,
};

export const fetchDepartments = createAsyncThunk(
  'search/fetchDepartments',
  async (): Promise<IDepartmentResult> => {
    const result = await fetchDepartmentsAPI();
    return await result.json();
  }
);

export const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDepartments.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.error = '';
        state.entities = mapKeys(payload.departments, (x) => x.departmentId);
      })
      .addCase(fetchDepartments.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Something went wrong'; // TODO
        state.entities = undefined;
      });
  },
});

export const getDepartments = (state: RootState) => {
  const data = state.department.entities;
  return data ? Object.values(data) : undefined;
};

export default departmentSlice.reducer;
