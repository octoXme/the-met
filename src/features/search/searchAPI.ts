import formatSearchParams from '../../helpers/format-search-params';
import { ISearchParam } from '../../model/ISearch';

const API = 'https://collectionapi.metmuseum.org/public/collection/v1/search';

export async function fetchSearchResults(params: ISearchParam) {
  const searchParams = formatSearchParams(params);
  return await fetch(`${API}?${searchParams}`);
}
