import React from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { getFilterSelector, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import {
  FetchPizza,
  fetchPizzas,
  getPizzasSelector,
  PizzaType,
  SearchParamsType,
  Status,
} from '../redux/slices/pizzasSlice';

import Categories from '../components/Categories';
import Sort, { SortValues } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import SceletonPizzaBlock from '../components/PizzaBlock/Sceleton';
import Search from '../components/Search';
import Pagination from '../components/Pagination';
import { useAppDispatch } from '../redux/store';

const Pizzas: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sortType, orderType, currentPage, searchValue } =
    useSelector(getFilterSelector);

  const { pizzas, status } = useSelector(getPizzasSelector);

  const getPizzas = async () => {
    dispatch(
      fetchPizzas({
        categoryId,
        sortCategory: sortType.sortCategory,
        orderType,
        currentPage,
        searchValue,
      }),
    );
  };

  // Проверяем, есть ли параметры в ссылке, если да, то вытаскиваем
  React.useEffect(() => {
    console.log(window.location.search);
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchParamsType;
      const sortType = SortValues.find((obj) => obj.sortCategory === params.sort) || SortValues[0];

      dispatch(
        setFilters({
          searchValue: params.searchValue,
          categoryId: Number(params.categoryId),
          sortType: sortType,
          orderType: params.orderType,
          currentPage: Number(params.currentPage),
        }),
      );
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

  const selectPage = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  console.log(pizzas);
  const pizzasElements = pizzas.map((pizzaData: PizzaType) => (
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
      <div className="content__title">
        <h2>Пиццы</h2>
        <Search />
      </div>
      <div className="content__items">
        {status === Status.ERROR ? (
          <div className="content__items_error">
            <h2>К сожалению, не удалось загрузить пиццы(</h2>
          </div>
        ) : status === Status.SUCCESS ? (
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
};

export default Pizzas;
