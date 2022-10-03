import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingState from 'components/loadingState';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    overflow: 'inherit !important',
  },
  loader: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(3),
  },
}));

interface IInfiniteLoadingList {
  hasChildren: boolean;
  dataLength: number;
  hasMore: boolean;
  loadFunction: any;
  children: React.ReactElement;
}

const InfiniteLoadingList = ({
  hasChildren,
  dataLength,
  hasMore,
  loadFunction,
  children,
}: IInfiniteLoadingList) => {
  const { classes } = useStyles();
  return (
    <InfiniteScroll
      className={classes.root}
      hasChildren={hasChildren}
      dataLength={dataLength}
      next={loadFunction}
      hasMore={hasMore}
      loader={
        <div className={classes.loader}>
          <LoadingState />
        </div>
      }
    >
      {children}
    </InfiniteScroll>
  );
};

export default InfiniteLoadingList;
