import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './redux/store';

import './index.scss';

import App from './components/App';
import Cart from './pages/Cart';
import Pizzas from './pages/Pizzas';
import NotFound from './pages/NotFound';
import PizzaView from './components/PizzaView';

const rootElement = document.getElementById('root');

if(rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Pizzas />} />
            <Route path="pizza/:id" element={<PizzaView />} />
            <Route path="cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>,
  );
}

