import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import SceletonPizzaBlock from '../components/PizzaBlock/Sceleton';

export default function Pizzas() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);

  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortCategory: 'rating',
    order: true,
  });
  const [sortOrder, setSortOrder] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://63f9ed3d473885d837d4f7e1.mockapi.io/items?${
        categoryId ? `category=${categoryId}&` : ''
      }sortBy=${sortType.sortCategory}&order=${sortOrder ? 'desc' : 'asc'}`,
    )
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(new Error(res));
      })
      .then((data) => {
        setPizzas(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [categoryId, sortType, sortOrder]);

  const pizzasElements = pizzas.map((pizzaData) => (
    <PizzaBlock key={pizzaData.id} {...pizzaData} />
  ));
  const sceletonPizzasElements = [...new Array(6)].map((_, index) => (
    <SceletonPizzaBlock key={index} />
  ));

  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={(id) => setCategoryId(id)} />
        <Sort
          sortType={sortType}
          onClickSortItem={(sort) => setSortType(sort)}
          sortOrder={sortOrder}
          handleSortOrder={() => setSortOrder(!sortOrder)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? sceletonPizzasElements : pizzasElements}</div>
    </>
  );
}
