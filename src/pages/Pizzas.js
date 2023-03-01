import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import SceletonPizzaBlock from '../components/PizzaBlock/Sceleton';
import Search from '../components/Search';
import Pagination from '../components/Pagination';

export const SearchContext = React.createContext();

export default function Pizzas() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortCategory: 'rating',
  });
  const [sortOrder, setSortOrder] = React.useState(true);

  const [searchValue, setSearchValue] = React.useState('');
  const [selectedPage, setSelectedPage] = React.useState(1);

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://63f9ed3d473885d837d4f7e1.mockapi.io/items?page=${selectedPage}&limit=4&${
        categoryId ? `category=${categoryId}&` : ''
      }sortBy=${sortType.sortCategory}${searchValue ? `&filter=${searchValue}&` : ''}&order=${
        sortOrder ? 'desc' : 'asc'
      }`,
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
  }, [categoryId, sortType, sortOrder, searchValue, selectedPage]);

  const pizzasElements = pizzas.map((pizzaData) => (
    <PizzaBlock key={pizzaData.id} {...pizzaData} />
  ));
  const sceletonPizzasElements = [...new Array(6)].map((_, index) => (
    <SceletonPizzaBlock key={index} />
  ));

  return (
    <>
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onClickCategory={(id) => setCategoryId(id)}
          categories={categories}
        />
        <Sort
          sortType={sortType}
          onClickSortItem={(sort) => setSortType(sort)}
          sortOrder={sortOrder}
          handleSortOrder={() => setSortOrder(!sortOrder)}
        />
      </div>
      <div className="content__title">
        <h2>{categories[categoryId]} пиццы</h2>
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        </SearchContext.Provider>
      </div>
      <div className="content__items">{isLoading ? sceletonPizzasElements : pizzasElements}</div>
      <Pagination onChangePage={(number) => setSelectedPage(number)} />
    </>
  );
}
