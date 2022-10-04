import { useAppDispatch, useAppSelector } from 'app/hooks';
import SelectInput from 'components/formik/SelectInput';
import { useEffect } from 'react';
import { fetchDepartments, getDepartments } from './departmentSlice';

export default function DepartmentInput(props: any) {
  const dispatch = useAppDispatch();
  const departments = useAppSelector(getDepartments);

  useEffect(() => {
    if (!departments) {
      dispatch(fetchDepartments());
    }
  }, [departments, dispatch]);

  const options = departments?.map((item) => {
    return { value: item.departmentId, label: item.displayName };
  });

  return <SelectInput options={options || []} {...props} />;
}
