import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { IDepartmentResult, IDepartmentSate } from '../../model/IDepartment';
import { fetchDepartmentsAPI } from './departmentAPI';

export const initialState: IDepartmentSate = {
  status: 'idle',
  error: '',
  entities: [],
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
        state.entities = payload.departments;
      })
      .addCase(fetchDepartments.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Something went wrong'; // TODO
        state.entities = [];
      });
  },
});

export const getDepartments = (state: RootState) => state.department.entities;

export default departmentSlice.reducer;
