import { CartItemType } from "../redux/slices/cartSlice";

export const getItemsFromLS = () => {
  const data = localStorage.getItem('cart') || '';
  const items: CartItemType[] = JSON.parse(data) || [];
  const totalPrice: number = items.reduce((acc, item) => (acc += item.price * item.count), 0);

  return {
    items,
    totalPrice
  }
}