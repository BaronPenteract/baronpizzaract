import React from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

import { setSearchValue } from '../../redux/slices/filterSlice';

import styles from './Search.module.scss';

const Search: React.FC = () => {
  const dispatch = useDispatch();

  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onUpdateInput = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 200),
    [],
  );

  const onChangeInput = (e: any) => {
    setValue(e.target.value);
    onUpdateInput(e.target.value);
  };

  const onClearValue = () => {
    inputRef.current?.focus();
    setValue('');
    dispatch(setSearchValue(''));
  };

  return (
    <div className={styles.root}>
      <svg className={styles.icon} viewBox="0 0 48 48">
        <path
          fill="#616161"
          d="M34.6 28.1H38.6V45.1H34.6z"
          transform="rotate(-45.001 36.586 36.587)"
        />
        <path fill="#616161" d="M20 4A16 16 0 1 0 20 36A16 16 0 1 0 20 4Z" />
        <path
          fill="#37474F"
          d="M36.2 32.1H40.2V44.400000000000006H36.2z"
          transform="rotate(-45.001 38.24 38.24)"
        />
        <path fill="#64B5F6" d="M20 7A13 13 0 1 0 20 33A13 13 0 1 0 20 7Z" />
        <path
          fill="#BBDEFB"
          d="M26.9,14.2c-1.7-2-4.2-3.2-6.9-3.2s-5.2,1.2-6.9,3.2c-0.4,0.4-0.3,1.1,0.1,1.4c0.4,0.4,1.1,0.3,1.4-0.1C16,13.9,17.9,13,20,13s4,0.9,5.4,2.5c0.2,0.2,0.5,0.4,0.8,0.4c0.2,0,0.5-0.1,0.6-0.2C27.2,15.3,27.2,14.6,26.9,14.2z"
        />
      </svg>
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        placeholder="Поиск пицц"
        value={value}
        onChange={onChangeInput}
      />
      {value && (
        <svg className={styles.del} onClick={onClearValue} viewBox="0 0 50 50">
          <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 32.990234 15.986328 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.990234 15.986328 z" />
        </svg>
      )}
    </div>
  );
};

export default Search;
