import { Paper, Input, CircularProgress, Divider, Badge } from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import DefaultButton from 'components/defaultButton';
import IconButton from 'components/iconButton';
import { SearchIcon, FilterIcon } from 'components/icons';
import { closeDrawer, openDrawer } from 'features/drawer/drawerSlice';
import { FormikHelpers } from 'formik';
import isSearchStringValid from 'helpers/is-search-string-valid';
import { isEqual } from 'lodash';
import { ISearchParam } from 'model/ISearch';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import SearchFilterForm from './searchFilterForm';
import {
  fetchArts,
  getSearchParams,
  getSearchStatus,
  initialState,
  resetSearch,
} from './searchSlice';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flex: '1 1 auto',
  },
  searchBar: {
    borderRadius: 48 / 2,
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
    margin: theme.spacing(0, 1),
  },
  badge: {
    top: theme.spacing(1 / 2),
    right: theme.spacing(1 / 2),
  },
}));

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();

  const currentSearchParams = useSelector(getSearchParams);
  const currentStatus = useSelector(getSearchStatus);
  const [value, setValue] = useState(currentSearchParams.q);

  useEffect(() => {
    setValue(currentSearchParams.q);
  }, [currentSearchParams]);

  const onSearchEvents = async (params: ISearchParam) => {
    dispatch(fetchArts({ pageNumber: 0, pageSize: 20, params }));
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue(event.target?.value);
  };

  const handleSearch = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (!isSearchStringValid(value)) return;
    onSearchEvents({ ...currentSearchParams, q: value });
  };

  const handleClear = () => {
    setValue('');
    dispatch(resetSearch());
  };

  const handleReset = () => {
    handleClear();
    dispatch(closeDrawer());
  };

  const handleFormSubmit = (
    values: ISearchParam,
    formikHelpers: FormikHelpers<ISearchParam>
  ): void => {
    onSearchEvents(values).then(() => {
      formikHelpers.setSubmitting(false);
      dispatch(closeDrawer());
    });
  };

  const openFilter = () =>
    dispatch(
      openDrawer({
        header: (
          <DefaultButton onClick={handleReset} color='inherit'>
            Clear
          </DefaultButton>
        ),
        children: <SearchFilterForm onSubmit={handleFormSubmit} />,
      })
    );

  return (
    <div className={classes.root}>
      <Paper className={classes.searchBar} component='form'>
        <Input
          className={classes.input}
          placeholder='Search'
          onChange={handleChange}
          value={value}
          autoFocus
          disableUnderline
          disabled={currentStatus === 'loading'}
        />
        {currentStatus === 'loading' && <CircularProgress size={20} />}
        <Divider className={classes.divider} orientation='vertical' />
        <IconButton
          type='submit'
          title='Search art object by keywords'
          onClick={handleSearch}
          icon={<SearchIcon />}
          disabled={currentStatus === 'loading'}
        />
        <IconButton
          title='Search Filters'
          onClick={openFilter}
          icon={
            <Badge
              classes={{
                badge: classes.badge,
              }}
              color='secondary'
              variant='dot'
              invisible={isEqual(
                currentSearchParams,
                initialState.searchParams
              )}
            >
              <FilterIcon />
            </Badge>
          }
        />
      </Paper>
    </div>
  );
}
