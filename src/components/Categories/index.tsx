import React from 'react';

import './Categories.scss';

const categories: string[] = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

type CategoriesPropsType = {
  categoryId: number;
  handleCategotyClick: (index: number) => void;
};

const Categories: React.FC<CategoriesPropsType> = ({ categoryId, handleCategotyClick }) => {
  const categoriesElements = categories.map((category, index) => (
    <li
      key={index}
      onClick={() => handleCategotyClick(index)}
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
};

export default Categories;
