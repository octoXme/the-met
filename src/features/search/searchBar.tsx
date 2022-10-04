import { Paper, Input, CircularProgress, Divider } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import IconButton from 'components/iconButton';
import { SearchIcon, CloseIcon } from 'components/icons';
import isSearchStringValid from 'helpers/is-search-string-valid';
import { ISearchParam } from 'model/ISearch';
import { useEffect, useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import {
  DEFAULT_PAGE_SIZE,
  fetchArts,
  getSearchParams,
  getSearchStatus,
  resetSearch,
} from './searchSlice';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flex: '1 1 auto',
  },
  searchBar: {
    maxWidth: 480,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    flex: '1 1 auto',
    padding: theme.spacing(0, 0, 0, 2),
  },
  divider: {
    height: 28,
    marginLeft: theme.spacing(1),
  },
}));

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();

  const currentSearchParams = useAppSelector(getSearchParams);
  const currentStatus = useAppSelector(getSearchStatus);
  const [value, setValue] = useState(currentSearchParams.q);

  useEffect(() => {
    setValue(currentSearchParams.q);
  }, [currentSearchParams]);

  const onSearch = async (params: ISearchParam) => {
    dispatch(fetchArts({ pageNumber: 0, pageSize: DEFAULT_PAGE_SIZE, params }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target?.value);
  };

  const handleSearch = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (!isSearchStringValid(value)) return;
    onSearch({ ...currentSearchParams, q: value });
  };

  const handleClear = () => {
    setValue('');
    dispatch(resetSearch());
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.searchBar} component='form'>
        <Input
          className={classes.input}
          placeholder='Search The Met'
          onChange={handleChange}
          value={value}
          autoFocus
          disableUnderline
          disabled={currentStatus === 'loading'}
        />
        {currentStatus === 'loading' && <CircularProgress size={20} />}
        {currentSearchParams.q && (
          <IconButton
            title='Remove keyword'
            onClick={handleClear}
            icon={<CloseIcon fontSize='small' />}
            disabled={currentStatus === 'loading'}
          />
        )}
        <Divider className={classes.divider} orientation='vertical' />
        <IconButton
          type='submit'
          title='Search art object by keywords'
          onClick={handleSearch}
          icon={<SearchIcon fontSize='small' />}
          disabled={currentStatus === 'loading'}
        />
      </Paper>
    </div>
  );
}
