import React from 'react';

import './Categories.scss';

export default function Categories({ categoryId, onClickCategory, categories }) {
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
