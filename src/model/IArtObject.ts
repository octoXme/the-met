import { LoadableState } from './ILoadableState';

export interface IArtObjectState {
  data: IArtObject | undefined;
  status: LoadableState;
  error: string;
}

export interface IArtState {
  entities:
    | {
        [key: string]: IArtObjectState;
      }
    | undefined;
}

export interface IArtObject {
  objectId: number;
  isHighlight: boolean;
  accessionNumber: string;
  accessionYear: string;
  isPublicDomain: boolean;
  primaryImage: string;
  primaryImageSmall: string;
  additionalImages: string[];
  constituents: IConstituent[];
  department: string;
  objectName: string;
  title: string;
  culture: string;
  period: string;
  dynasty: string;
  reign: string;
  portfolio: string;
  artistRole: string;
  artistPrefix: string;
  artistDisplayName: string;
  artistDisplayBio: string;
  artistSuffix: string;
  artistAlphaSort: string;
  artistNationality: string;
  artistBeginDate: string;
  artistEndDate: string;
  artistGender: string;
  artistWikidata_URL: string;
  artistULAN_URL: string;
  objectDate: string;
  objectBeginDate: string;
  objectEndDate: string;
  medium: string;
  dimensions: string;
  dimensionsParsed: IDimensionsParsed[]; //float???
  measurements: IMeasurement[];
  creditLine: string;
  geographyType: string;
  city: string;
  state: string;
  county: string;
  country: string;
  region: string;
  subregion: string;
  locale: string;
  locus: string;
  excavation: string;
  river: string;
  classification: string;
  rightsAndReproduction: string;
  linkResource: string;
  metadataDate: string;
  repository: string;
  objectURL: string;
  tags: ITag[];
  objectWikidata_URL: string;
  isTimelineWork: boolean;
  GalleryNumber: boolean;
}

export interface IConstituent {
  constituentID: number;
  role: string;
  name: string;
  constituentULAN_URL: string;
  constituentWikidata_URL: string;
  gender: string;
}

// float???
export interface IDimensionsParsed {
  element: string;
  dimensionType: string;
  dimension: number;
}

export interface IMeasurement {
  elementName: string;
  elementDescription: string;
  elementMeasurements: IElementMeasurement;
}

export interface IElementMeasurement {
  Height: number;
  Length: number;
  Width: number;
}

export interface ITag {
  term: string;
  AAT_URL: string;
  Wikidata_URL: string;
}
