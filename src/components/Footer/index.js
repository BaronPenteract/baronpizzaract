import { Link } from 'react-router-dom';

import './Footer.scss';
import logo from '../../images/logo.png';

export default function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <Link to="/">
          <div className="footer__logo">
            <img src={logo} alt="BaronPizzaract logo" />
            <div>
              <h2>BaronPizzaract</h2>
              <p>наивкуснейшая Pizza</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
