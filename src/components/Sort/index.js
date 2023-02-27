import React from 'react';

import './Sort.scss';

export default function Sort({ sortType, onClickSortItem, sortOrder, handleSortOrder }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const listValues = [
    { name: 'популярности', sortCategory: 'rating' },
    { name: 'цене', sortCategory: 'price' },
    { name: 'алфавиту', sortCategory: 'title' },
  ];

  const listElements = listValues.map((obj, index) => (
    <li
      onClick={() => handleListElementClick(obj)}
      key={index}
      className={sortType.sortCategory === obj.sortCategory ? 'active' : ''}
    >
      {obj.name}
    </li>
  ));

  const handleListElementClick = (item) => {
    onClickSortItem(item);
    setIsOpen(false);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <div onClick={handleSortOrder}>
          <svg
            style={sortOrder ? { transform: 'rotate(180deg)' } : {}}
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
}