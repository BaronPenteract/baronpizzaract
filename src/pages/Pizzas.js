import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import SceletonPizzaBlock from '../components/PizzaBlock/Sceleton';

export default function Pizzas() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://63f9ed3d473885d837d4f7e1.mockapi.io/items')
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
  }, []);

  const pizzasElements = pizzas.map((pizzaData) => (
    <PizzaBlock key={pizzaData.id} {...pizzaData} />
  ));
  const sceletonPizzasElements = [...new Array(6)].map((_, index) => (
    <SceletonPizzaBlock key={index} />
  ));

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? sceletonPizzasElements : pizzasElements}</div>
    </>
  );
}
