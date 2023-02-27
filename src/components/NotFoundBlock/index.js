import styles from './NotFoundBlock.module.scss';
import notFoundImage from '../../images/pizza-morty-angry.png';

export default function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <img src={notFoundImage} alt="К сожалению, эта страница отсутствует." />
      <h2>К сожалению, эта страница отсутствует.</h2>
    </div>
  );
}
