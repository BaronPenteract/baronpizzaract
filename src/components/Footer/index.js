import { Link } from 'react-router-dom';

import './Footer.scss';
import logo from '../../images/logo.png';

export default function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <Link to="/">
          <div className="footer__logo">
            <img width="38" src={logo} alt="BaronPizzaract logo" />
            <div>
              <h1>BaronPizzaract</h1>
              <p>самая вкусная пицца во всех вселенных и измерениях</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
