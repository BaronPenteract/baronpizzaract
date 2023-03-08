import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId } from '../../redux/slices/filterSlice';
import './Categories.scss';

export default function Categories() {
  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

  const categoryId = useSelector((state) => state.filter.categoryId);
  const dispatch = useDispatch();

  const categoriesElements = categories.map((category, index) => (
    <li
      key={index}
      onClick={() => dispatch(setCategoryId(index))}
      className={categoryId === index ? 'active' : ''}
    >
      {category}
    </li>
  ));

  return (
    <div className="categories">
      <ul>{categoriesElements}</ul>
    </div>
  );
}
