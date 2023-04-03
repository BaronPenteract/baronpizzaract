import { Link } from 'react-router-dom';

import './Footer.scss';
import logo from '../../images/logo.png';

const Footer: React.FC = () => {
  return (
    <div className="footer background">
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
};
export default Footer;
