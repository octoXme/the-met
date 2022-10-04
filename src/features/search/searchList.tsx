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
import { Typography } from '@mui/material';

export default function SearchList() {
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector(getSearchResults);
  const pageInfo = useAppSelector(getPageInfo);
  const currentSearchParams = useAppSelector(getSearchParams);

  const handleLoadMore = debounce(() => {
    dispatch(
      fetchArts({
        pageSize: pageInfo.pageSize,
        pageNumber: pageInfo.pageNumber + 1,
        params: currentSearchParams,
      })
    );
  }, 300);

  if (!searchResults)
    return (
      <Typography variant='h5'>
        No results match your search criteria!
      </Typography>
    ); // empty state

  return (
    <InfiniteLoadingList
      hasChildren={!isEmpty(searchResults)}
      dataLength={searchResults.length}
      loadFunction={handleLoadMore}
      hasMore={pageInfo.totalPages > pageInfo.pageNumber + 1}
    >
      <Masonry
        columns={{ xs: 1, sm: 2, lg: 3 }}
        spacing={{ xs: 0, sm: 1, lg: 2 }}
      >
        {searchResults?.map((id) => (
          <ArtCard key={id} id={id} />
        ))}
      </Masonry>
    </InfiniteLoadingList>
  );
}
