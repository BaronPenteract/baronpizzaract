import { Link } from 'react-router-dom';

import emptyCartImage from '../images/pizza-morty-sad.png';

export default function EmptyCart() {
  return (
    <div className="container container--cart">
      <div className="cart cart--empty">
        <img src={emptyCartImage} alt="Empty cart" />
        <h2>
          Корзина пустая <span>😕</span>
        </h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <Link href="/" className="button button--black">
          <span>На главную</span>
        </Link>
      </div>
    </div>
  );
}
