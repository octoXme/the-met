import { ISearchParam } from 'model/ISearch';
import formatSearchParams from '../../helpers/format-search-params';

export async function fetchSearchResults(params: ISearchParam) {
  const searchParams = formatSearchParams(params);
  console.log('formatSearchParams', searchParams);
  return await fetch(`${process.env.REACT_APP_API_URL}/search?${searchParams}`);
}
