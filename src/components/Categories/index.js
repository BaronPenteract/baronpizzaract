import React from 'react';

import './Categories.scss';

export default function Categories({ categoryId, onClickCategory }) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const categoriesElements = categories.map((category, index) => (
    <li
      key={index}
      onClick={() => onClickCategory(index)}
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
