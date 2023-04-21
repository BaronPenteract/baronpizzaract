import { CartItemType } from "../redux/slices/cartSlice";

export const getItemsFromLS = () => {
  const data = localStorage.getItem('cart') || '';
  if(data) {
    const items: CartItemType[] = JSON.parse(data)
    const totalPrice: number = items.reduce((acc, item) => (acc += item.price * item.count), 0);

    return {
      items,
      totalPrice
    }
  } else {
    return {
      items: [],
      totalPrice: 0
    } as {items: CartItemType[], totalPrice: number}
  }

}