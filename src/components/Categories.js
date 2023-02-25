import React from 'react';

export default function Categories() {
  const [categoryIndex, setCategoryIndex] = React.useState(0);

  const categories = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const handleClick = (index) => {
    setCategoryIndex(index);
  };
  const categoriesElements = categories.map((category, index) => (
    <li
      key={index}
      onClick={() => handleClick(index)}
      className={categoryIndex === index ? 'active' : ''}
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
