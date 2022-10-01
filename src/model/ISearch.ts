import { LoadableState } from './ILoadableState';

export interface IResult {
  total: number;
  objectId: number[];
}

export interface ISearchResult extends IResult {
  pageNumber: number;
  pageSize: number;
  params: ISearchParam;
}

export interface ISearchParam {
  q: string;
  isHighlight?: boolean;
  title?: string;
  tags?: boolean;
  departmentId?: string;
  isOnView?: boolean;
  artistOrCulture?: boolean;
  medium?: string;
  hasImages?: boolean;
  geoLocation?: string;
  dateBegin?: string;
  dateEnd?: string;
}

export interface ISearchPage {
  pageSize: number;
  pageNumber: number;
  totalNumber: number;
  totalPages: number;
}

export interface ISearchState {
  total: number;
  entities: number[];
  status: LoadableState;
  error: string;
  page: ISearchPage;
  searchParam: ISearchParam;
}
