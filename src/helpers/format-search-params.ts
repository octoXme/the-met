import { isEmpty, reduce } from 'lodash';
import { ISearchParam } from 'model/ISearch';

const validValue = (value: string | number | boolean) => {
  if (typeof value === 'number') {
    return value !== null;
  }

  if (typeof value === 'boolean') {
    return value !== false || undefined;
  }

  return !isEmpty(value);
};

function formatSearchParams(params: ISearchParam): string {
  if (isEmpty(params)) return '';

  return reduce(
    params,
    (result, value, key) => {
      if (validValue(value)) {
        console.log('value', value, key);

        result += `&${key}=${encodeURIComponent(value)}`;
      }
      return result;
    },
    ''
  );
}

export default formatSearchParams;
