import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setSortType, setOrderType, getFilterSelector } from '../../redux/slices/filterSlice';
import './Sort.scss';

type ListValue = { name: string; sortCategory: string };

export const listValues: ListValue[] = [
  { name: 'популярности', sortCategory: 'rating' },
  { name: 'цене', sortCategory: 'price' },
  { name: 'алфавиту', sortCategory: 'title' },
];

const Sort = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const sortRef = React.useRef<HTMLDivElement>(null);

  const { sortType, order } = useSelector(getFilterSelector);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const handleClickOutsideSort = (e: any) => {
      if (!e.path.includes(sortRef.current)) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutsideSort);

    return () => document.body.removeEventListener('click', handleClickOutsideSort);
  }, []);

  const listElements = listValues.map((obj, index) => (
    <li
      onClick={() => handleListElementClick(obj)}
      key={index}
      className={sortType.sortCategory === obj.sortCategory ? 'active' : ''}
    >
      {obj.name}
    </li>
  ));

  const handleListElementClick = (item: any) => {
    dispatch(setSortType(item));
    setIsOpen(false);
  };

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <div onClick={() => dispatch(setOrderType(!order))}>
          <svg
            style={order ? { transform: 'rotate(180deg)' } : {}}
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
          <b>Сортировка по:</b>
        </div>
        <span onClick={() => setIsOpen(!isOpen)}>{sortType.name}</span>
      </div>
      <div className={`sort__popup ${isOpen ? 'sort__popup_active' : ''}`}>
        <ul>{listElements}</ul>
      </div>
    </div>
  );
};

export default Sort;
