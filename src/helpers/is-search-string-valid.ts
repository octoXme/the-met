import { isString, size, trim } from 'lodash';

export default function isSearchStringValid(
  searchString: string | unknown | undefined,
  minlength: number = 1,
  maxLength: number = 150
) {
  if (!isString(searchString)) return false;
  const inputLength = size(trim(searchString));

  if (maxLength !== undefined) {
    return inputLength >= minlength && inputLength <= maxLength;
  }

  return inputLength >= minlength;
}
