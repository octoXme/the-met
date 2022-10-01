import { isEmpty, isString, mapKeys } from 'lodash';

// only consider string params
const validValue = (value: any) => !isEmpty(value) && isString(value);

// const isNumber = (value: unknown): value is number => {
//   return !isNaN(Number(value));
// };

// const isDate = (value: unknown): value is string => {
//   if (!isString(value)) {
//       return false;
//   }
//   const date = momentFromString(value, "YYYY-MM-DD");
//   return date.isValid();
// };

// const isString = (value: unknown): value is string => {
//   return typeof value === "string";
// };

// const isObject = (value: unknown): value is Record<string, unknown> => {
//   if (typeof value !== "object" || value == null || Array.isArray(value)) {
//       return false;
//   }
//   return true;
// };

function formatSearchParams(params: any): string {
  let url = '';
  if (isEmpty(params)) return '';

  mapKeys(params, (value, key) => {
    if (validValue(value)) {
      url += `&${key}=${encodeURIComponent(value)}`;
    }
  });

  return url;
}

export default formatSearchParams;
