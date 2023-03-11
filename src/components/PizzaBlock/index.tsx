import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { addItem, getCartSelector } from '../../redux/slices/cartSlice';

import './PizzaBlock.scss';

type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
  rating,
}) => {
  const [activeSize, setActiveSize] = React.useState(0);
  const [activeType, setActiveType] = React.useState(types[0]);

  const typeNames = ['Тонкое', 'Традиционное'];

  const dispatch = useDispatch();

  const handleAddClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
    };

    dispatch(addItem(item));
  };

  const { items } = useSelector(getCartSelector);
  const cartItem = items.find((item: any) => item.id === id);

  const sizeButtonsElements = sizes.map((size, index) => (
    <li
      key={index}
      onClick={() => setActiveSize(index)}
      className={index === activeSize ? 'active' : ''}
    >
      {size} см.
    </li>
  ));

  const typeButtonsElements = types.map((type) => (
    <li
      key={type}
      onClick={() => setActiveType(type)}
      className={type === activeType ? 'active' : ''}
    >
      {typeNames[type]}
    </li>
  ));

  return (
    <div className="pizza-block">
      <span className="pizza-block__rating">{rating}</span>
      <Link to={`pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt={`Pizza ${title}`} />
      </Link>
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>{typeButtonsElements}</ul>
        <ul>{sizeButtonsElements}</ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button
          type="button"
          onClick={handleAddClick}
          className="button button--outline button--add"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {cartItem && <i>{cartItem.count}</i>}
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
