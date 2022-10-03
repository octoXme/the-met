import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from './counterSlice';
import styles from './Counter.module.css';
import { fetchArts } from '../search/searchSlice';
import { fetchArtById } from '../art/artSlice';
import { fetchDepartments } from '../department/departmentSlice';
import SearchFilterForm from 'features/search/searchFilterForm';
import { FormikValues } from 'formik';

export function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  const handleSubmit = () => {
    dispatch(
      fetchArts({ pageNumber: 0, pageSize: 20, params: { q: 'sunflower' } })
    );
  };

  const handleGetArt = () => {
    dispatch(fetchArtById(25111));
  };

  const handleGetAllDepartments = () => {
    dispatch(fetchDepartments());
  };

  return (
    <div>
      <div className={styles.row}>
        <button onClick={handleSubmit}>HELLLLLLLLLLLLLLLLO</button>

        <button onClick={handleGetArt}>get me some art</button>

        <button onClick={handleGetAllDepartments}>get departments</button>

        <button
          className={styles.button}
          aria-label='Decrement value'
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label='Increment value'
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label='Set increment amount'
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button>
      </div>
    </div>
  );
}
