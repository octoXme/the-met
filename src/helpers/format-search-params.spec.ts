import { ISearchParam } from 'model/ISearch';
import formatSearchParams from './format-search-params';

describe('formatSearchParams', () => {
  it('should handle empty object', () => {
    const params = {};
    const underTest = formatSearchParams(params);

    expect(underTest).toEqual('');
  });

  it('should handle invalid value type', () => {
    const params = {
      keyword: 'something',
      something: { value: 'invalided value' } as any,
    } as ISearchParam;
    const underTest = formatSearchParams(params);

    expect(underTest).toEqual('&keyword=something');
  });

  it('should handle format correctly', () => {
    const params = {
      q: 'flower',
      departmentId: 24,
      showSomethingOnly: false,
      showImageOnly: true,
    };

    const underTest = formatSearchParams(params);
    expect(underTest).toEqual('&q=flower&departmentId=24&showImageOnly=true');
  });
});
