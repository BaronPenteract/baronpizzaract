import axios from 'axios';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import PizzaViewSceleton from './PizzaViewSceleton';

import styles from './PizzaView.module.scss';

const PizzaView: React.FC = () => {
  window.scrollTo(0, 0);

  const [pizza, setPizza] = React.useState<{
      id: string
      title: string,
      imageUrl: string,
      price: number}>
    ({
      id: '',
      title: '',
      imageUrl: '',
      price: 0
    });

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function getPizza() {
      try {
        const pizzaData = await axios.get(
          `https://63f9ed3d473885d837d4f7e1.mockapi.io/items/` + id,
        );

        setPizza(pizzaData.data);
      } catch (err) {
        alert('Пиццы в меню нашем такой нет!');
        navigate('/');
      }
    }

    getPizza();
  }, []);

  const pizzaElement = (
    <>
      <img className={styles.img} src={pizza.imageUrl} alt={pizza.title} />
      <h2>{pizza.title}</h2>
      <p>{pizza.price} рублей</p>
    </>
  );

  return (
    <div className={`${styles.root}`}>
      {pizza.id ? pizzaElement : <PizzaViewSceleton />}
      <div className={styles['button-container']}>
        <Link className="button" to="/">
          К остальным пиццам
        </Link>
      </div>
    </div>
  );
}

export default PizzaView;
