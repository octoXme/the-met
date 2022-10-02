import formatSearchParams from '../../helpers/format-search-params';
import { ISearchParam } from '../../model/ISearch';

export async function fetchSearchResults(params: ISearchParam) {
  const searchParams = formatSearchParams(params);
  return await fetch(`${process.env.REACT_APP_API_URL}/search?${searchParams}`);
}
