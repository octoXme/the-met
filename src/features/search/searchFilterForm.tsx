import DefaultButton from 'components/defaultButton';
import SwitchControl from 'components/defaultSwitchControl';
import TextInput from 'components/defaultTextInput';
import DepartmentInput from 'features/department/departmentInput';
import { Field, Formik, FormikHelpers } from 'formik';
import { ISearchParam } from 'model/ISearch';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import * as Yup from 'yup';
import { getSearchParams } from './searchSlice';

interface ISearchFilterForm {
  onSubmit: ((
    values: ISearchParam,
    formikHelpers: FormikHelpers<ISearchParam>
  ) => void | Promise<ISearchParam>) &
    ((
      values: ISearchParam,
      { setSubmitting }: FormikHelpers<ISearchParam>
    ) => void);
}

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
}));

const SearchFormSchema = Yup.object().shape({
  q: Yup.string().min(2, 'Too Short!').required('Required'),
});

export default function SearchFilterForm(props: ISearchFilterForm) {
  const { classes } = useStyles();
  const currentSearchParams = useSelector(getSearchParams);

  return (
    <Formik
      initialValues={{ ...currentSearchParams }}
      onSubmit={props.onSubmit}
      validationSchema={SearchFormSchema}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={classes.root}>
          <div className={classes.fields}>
            <Field component={TextInput} name='q' label='Keyword' />
            <Field component={TextInput} name='title' label='Title' />
            <Field component={TextInput} name='medium' label='Medium' />
            <Field
              component={TextInput}
              name='geoLocation'
              label='GeoLocation'
            />
            <Field
              component={DepartmentInput}
              name='departmentId'
              label='Department'
            />
            <div className={classes.fieldGroup}>
              <Field
                component={SwitchControl}
                name='isOnView'
                label='On display only'
              />
              <Field
                component={SwitchControl}
                name='isHighlight'
                label='Highlighted only'
              />
              <Field
                component={SwitchControl}
                name='hasImages'
                label='Has image only'
              />
              <Field component={SwitchControl} name='tags' label='Match tags' />
              <Field
                component={SwitchControl}
                name='artistOrCulture'
                label='Match artist name or culture field'
              />
            </div>

            {/* // custom select or auto complete*/}

            {/* // custom */}
            <Field component={TextInput} name='dateBegin' label='From' />
            <Field component={TextInput} name='dateEnd' label='to' />
          </div>

          <DefaultButton
            type='submit'
            disabled={isSubmitting}
            variant='outlined'
            loading={isSubmitting}
          >
            Search
          </DefaultButton>
        </form>
      )}
    </Formik>
  );
}
