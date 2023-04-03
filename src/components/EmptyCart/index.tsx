import { Link } from 'react-router-dom';

import emptyCartImage from '../../images/pizza-morty-sad.png';

const EmptyCart: React.FC = () => {
  return (
    <div className="container container--cart background">
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
        <Link to="/" className="button button--black">
          <span>На главную</span>
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
