import { LoadableState } from './ILoadableState';

export interface IDepartmentResult {
  departments: IDepartment[];
}

export interface IDepartment {
  departmentId: number;
  displayName: string;
}

export interface IDepartmentSate {
  status: LoadableState;
  error: string;
  entities:
    | {
        [departmentId: number]: IDepartment;
      }
    | undefined;
}
