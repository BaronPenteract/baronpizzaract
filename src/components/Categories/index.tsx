import { useSelector, useDispatch } from 'react-redux';

import { getFilterSelector, setCategoryId } from '../../redux/slices/filterSlice';
import './Categories.scss';

const categories: string[] = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC = () => {
  const { categoryId } = useSelector(getFilterSelector);
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
};

export default Categories;
