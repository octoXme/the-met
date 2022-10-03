import { LoadableState } from './ILoadableState';

export interface IResult {
  total: number;
  objectIDs: number[];
}

export interface ISearchResult extends IResult {
  pageNumber: number;
  pageSize: number;
  params: ISearchParam;
}

export interface ISearchParam {
  [key: string]: string | number | boolean;
}

// export interface ISearchParam {
//   q: string;
//   isHighlight?: boolean;
//   title?: string;
//   tags?: boolean;
//   departmentId?: string;
//   isOnView?: boolean;
//   artistOrCulture?: boolean;
//   medium?: string;
//   hasImages?: boolean;
//   geoLocation?: string;
//   dateBegin?: string;
//   dateEnd?: string;
// }

export interface ISearchPage {
  pageSize: number;
  pageNumber: number;
  totalNumber: number;
  totalPages: number;
}

export interface ISearchState {
  entities: number[];
  pages:
    | {
        [key: number]: number[];
      }
    | undefined;
  status: LoadableState;
  error: string;
  pageInfo: ISearchPage;
  searchParams: ISearchParam;
}

export type YearType = 'AC' | 'BC';
