import { useAppDispatch, useAppSelector } from 'app/hooks';
import DefaultButton from 'components/button';
import CheckboxControl from 'components/formik/checkboxControl';
import TextInput from 'components/formik/textInput';
import DepartmentInput from 'features/department/departmentInput';
import { Field, Formik, FormikHelpers } from 'formik';
import { FieldHelper, ISearchParam } from 'model/ISearch';
import { makeStyles } from 'tss-react/mui';
import * as Yup from 'yup';
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    height: '100%',
  },
  fields: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    flex: '1 1 auto',
  },
  fieldGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
  },
  actions: {
    display: 'flex',
    gap: theme.spacing(1),
    '& > *': {
      flex: '1 1 auto',
    },
  },
}));

const currentYear = new Date().getFullYear();

const SearchFormSchema = Yup.object().shape({
  q: Yup.string().min(2, 'Too Short!').required('Required').nullable(),
  title: Yup.string().nullable(),
  medium: Yup.string().nullable(),
  geoLocation: Yup.string().nullable(),
  departmentId: Yup.string().nullable(),
  isOnView: Yup.boolean().nullable(),
  hasImages: Yup.boolean().nullable(),
  isHighlight: Yup.boolean().nullable(),
  tags: Yup.boolean().nullable(),
  artistOrCulture: Yup.boolean().nullable(),
  dateBegin: Yup.number()
    .typeError('enter a valid year')
    .min(-100, 'too far into the history :(')
    .max(Yup.ref('dateEnd'), 'can not be grater than end date'),
  dateEnd: Yup.number()
    .typeError('enter a valid year')
    .min(Yup.ref('dateBegin'), 'cant not be less than start date')
    .max(currentYear, 'nothing in the future yet!'),
});

export default function SearchFilterForm() {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const currentSearchParams = useAppSelector(getSearchParams);
  const currentStatus = useAppSelector(getSearchStatus);

  const onSearch = async (params: ISearchParam) => {
    dispatch(fetchArts({ pageNumber: 0, pageSize: DEFAULT_PAGE_SIZE, params }));
  };

  const handleReset = () => {
    dispatch(resetSearch());
  };

  const handleFormSubmit = (
    values: ISearchParam,
    formikHelpers: FormikHelpers<ISearchParam>
  ): void => {
    formikHelpers.setSubmitting(true);
    onSearch(values).then(() => {
      formikHelpers.setSubmitting(false);
    });
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{ ...currentSearchParams }}
      onSubmit={handleFormSubmit}
      validationSchema={SearchFormSchema}
    >
      {({ handleSubmit, errors }) => {
        return (
          <form onSubmit={handleSubmit} className={classes.root}>
            <div className={classes.fields}>
              <Field
                component={TextInput}
                name='q'
                label='Keyword'
                helperText={FieldHelper.get('q')}
              />
              <Field
                component={TextInput}
                name='title'
                label='Title'
                helperText={FieldHelper.get('title')}
              />
              <Field
                component={TextInput}
                name='medium'
                label='Medium'
                helperText={FieldHelper.get('medium')}
                autocapitalize
              />
              <Field
                component={TextInput}
                name='geoLocation'
                label='GeoLocation'
                helperText={FieldHelper.get('geoLocation')}
                autocapitalize
              />
              <Field
                component={DepartmentInput}
                name='departmentId'
                label='Department'
              />
              <div className={classes.fieldGroup}>
                <Field
                  component={CheckboxControl}
                  name='isOnView'
                  label='On display'
                />
                <Field
                  component={CheckboxControl}
                  name='hasImages'
                  label='Has image'
                />
                <Field
                  component={CheckboxControl}
                  name='isHighlight'
                  label='Highlights'
                />
              </div>
              <div className={classes.fieldGroup}>
                <Field
                  component={CheckboxControl}
                  name='tags'
                  label='Match tags'
                />
                <Field
                  component={CheckboxControl}
                  name='artistOrCulture'
                  label='Match artist name or culture field'
                />
              </div>
              {/* // custom */}
              <Field
                component={TextInput}
                name='dateBegin'
                label='From'
                type='number'
                helperText={''}
              />
              <Field
                component={TextInput}
                name='dateEnd'
                label='To'
                type='number'
                helperText={FieldHelper.get('dateEnd')}
              />
            </div>
            <div className={classes.actions}>
              <DefaultButton
                onClick={handleReset}
                color='inherit'
                disabled={currentStatus === 'loading'}
              >
                Clear
              </DefaultButton>
              <DefaultButton
                type='submit'
                variant='outlined'
                disabled={currentStatus === 'loading'}
                loading={currentStatus === 'loading'}
              >
                Search
              </DefaultButton>
            </div>
          </form>
        );
      }}
    </Formik>
  );
}
