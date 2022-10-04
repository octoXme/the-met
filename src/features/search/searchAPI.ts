import { ISearchParam } from 'model/ISearch';
import formatSearchParams from '../../helpers/format-search-params';

export async function fetchSearchAPI(params: ISearchParam) {
  const searchParams = formatSearchParams(params);
  return await fetch(`${process.env.REACT_APP_API_URL}/search?${searchParams}`);
}
