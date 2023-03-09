import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { getFilterSelector, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas, getPizzasSelector } from '../redux/slices/pizzasSlice';

import Categories from '../components/Categories';
import Sort, { listValues } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import SceletonPizzaBlock from '../components/PizzaBlock/Sceleton';
import Search from '../components/Search';
import Pagination from '../components/Pagination';

export default function Pizzas() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sortType, orderType, currentPage, searchValue } =
    useSelector(getFilterSelector);

  const { pizzas, status } = useSelector(getPizzasSelector);

  const getPizzas = async () => {
    dispatch(fetchPizzas({ categoryId, sortType, orderType, currentPage, searchValue }));
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
      getPizzas();
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
        <Search />
      </div>
      <div className="content__items">
        {status === 'error' ? (
          <div className="content__items_error">
            <h2>К сожалению, не удалось загрузить пиццы(</h2>
          </div>
        ) : status === 'success' ? (
          pizzasElements
        ) : (
          sceletonPizzasElements
        )}
      </div>
      {status === 'success' && (
        <Pagination forcePage={currentPage} pageCount={3} onChangePage={selectPage} />
      )}
    </>
  );
}
