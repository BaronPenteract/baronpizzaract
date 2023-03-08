import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { setCurrentPage, setFilters } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort, { listValues } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import SceletonPizzaBlock from '../components/PizzaBlock/Sceleton';
import Search from '../components/Search';
import Pagination from '../components/Pagination';

export const SearchContext = React.createContext();

export default function Pizzas() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');

  const { categoryId, sortType, orderType, currentPage } = useSelector((state) => state.filter);

  const fetchPizzas = () => {
    setIsLoading(true);
    axios
      .get(
        `https://63f9ed3d473885d837d4f7e1.mockapi.io/items?page=${currentPage}&limit=4&${
          categoryId ? `category=${categoryId}&` : ''
        }sortBy=${sortType.sortCategory}${
          searchValue ? `&filter=${searchValue}&` : ''
        }&order=${orderType}`,
      )
      .then((res) => {
        setPizzas(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // Проверяем, есть ли параметры в ссылке, если да, то вытаскиваем
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = listValues.find((obj) => obj.sortCategory === params.sort);

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, orderType, searchValue, currentPage]);

  // Если приложение запустилось впервые, то не добавляем в адрес параметры
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        sort: sortType.sortCategory,
        currentPage,
        orderType,
        searchValue,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, orderType, searchValue, currentPage]);

  const selectPage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const pizzasElements = pizzas.map((pizzaData) => (
    <PizzaBlock key={pizzaData.id} {...pizzaData} />
  ));
  const sceletonPizzasElements = [...new Array(6)].map((_, index) => (
    <SceletonPizzaBlock key={index} />
  ));

  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} />
        <Sort />
      </div>
      <div className="content__title">
        <h2>Пиццы</h2>
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          <Search />
        </SearchContext.Provider>
      </div>
      <div className="content__items">{isLoading ? sceletonPizzasElements : pizzasElements}</div>
      <Pagination forcePage={currentPage} pageCount={3} onChangePage={selectPage} />
    </>
  );
}
