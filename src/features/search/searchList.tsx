import { useAppDispatch, useAppSelector } from 'app/hooks';
import ArtCard from 'features/art/artCard';
import {
  fetchArts,
  getPageInfo,
  getSearchParams,
  getSearchResults,
} from './searchSlice';
import Masonry from '@mui/lab/Masonry';
import InfiniteLoadingList from 'components/infiniteLoadingList';
import { debounce, isEmpty } from 'lodash';

export default function SearchList() {
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector(getSearchResults);
  const pageInfo = useAppSelector(getPageInfo);
  const currentSearchParams = useAppSelector(getSearchParams);

  const handleLoadMore = debounce((params) => {
    dispatch(
      fetchArts({
        pageSize: pageInfo.pageSize,
        pageNumber: pageInfo.pageNumber + 1,
        params: currentSearchParams,
      })
    );
  }, 300);

  if (!searchResults) return null; // empty state

  return (
    <InfiniteLoadingList
      hasChildren={!isEmpty(searchResults)}
      dataLength={searchResults.length}
      loadFunction={handleLoadMore}
      hasMore={pageInfo.totalPages > pageInfo.pageNumber + 1}
    >
      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
        {searchResults?.map((id) => (
          <div key={id}>
            ID ---- {id}
            <ArtCard id={id} />
          </div>
        ))}
      </Masonry>
    </InfiniteLoadingList>
  );
}
