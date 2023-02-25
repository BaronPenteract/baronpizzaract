import Header from './Header';
import Categories from './Categories';
import Sort from './Sort';
import PizzaBlock from './PizzaBlock';
import React from 'react';

function App() {
  const [pizzas, setPizzas] = React.useState([]);

  React.useEffect(() => {
    fetch('https://63f9ed3d473885d837d4f7e1.mockapi.io/items')
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(new Error(res));
      })
      .then((data) => {
        setPizzas(data);
      });
  }, []);

  const pizzasElements = pizzas.map((pizzaData) => (
    <PizzaBlock key={pizzaData.id} {...pizzaData} />
  ));

  return (
    <div className="wrapper">
      <div className="content">
        <Header />
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">{pizzasElements}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
