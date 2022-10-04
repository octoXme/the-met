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

export type FieldNameType =
  | 'q'
  | 'isHighlight'
  | 'title'
  | 'tags'
  | 'departmentId'
  | 'isOnView'
  | 'artistOrCulture'
  | 'medium'
  | 'hasImages'
  | 'geoLocation'
  | 'dateBegin'
  | 'dateEnd';

export const FieldHelper = new Map<FieldNameType, string>([
  ['q', 'Search term'],
  [
    'isHighlight',
    `Selected works of art from The Met Museum's permanent collection representing different cultures and time periods`,
  ],
  ['title', 'Specifically searching against the title field for objects'],
  [
    'tags',
    'Specifically searching against the subject keyword tags field for objects',
  ],
  ['departmentId', 'Art objects that are a part of a specific department'],
  ['isOnView', 'Currently on view in the museum'],
  [
    'artistOrCulture',
    'Specifically searching against the artist name or culture field for objects',
  ],
  [
    'medium',
    'Specified medium or object type. Examples include: "Ceramics", "Furniture", "Paintings", "Sculpture", "Textiles", etc',
  ],
  ['hasImages', 'Artwork contain image(s) that available under Open Access'],
  [
    'geoLocation',
    'Specified geographic location. Examples include: "Europe", "France", "Paris", "China", "New York", etc',
  ],
  [
    'dateBegin',
    'Examples include: dateBegin=1700&dateEnd=1800 for objects from 1700 A.D. to 1800 A.D., dateBegin=-100&dateEnd=100 for objects between 100 B.C. to 100 A.D.',
  ],
  [
    'dateEnd',
    'Examples include: dateBegin=1700&dateEnd=1800 for objects from 1700 A.D. to 1800 A.D., dateBegin=-100&dateEnd=100 for objects between 100 B.C. to 100 A.D.',
  ],
]);

export interface ISearchPage {
  pageSize: number;
  pageNumber: number;
  totalNumber: number;
  totalPages: number;
}

export interface ISearchState {
  entities: number[];
  status: LoadableState;
  error: string;
  pageInfo: ISearchPage;
  searchParams: ISearchParam;
}

export type YearType = 'AC' | 'BC';
