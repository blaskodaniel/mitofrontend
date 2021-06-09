import { selector } from 'recoil';
import { cart } from './atoms';

export const addToCart = selector({
  key: 'addToCart',
  set: ({ set, get }, ticket) => {
    const cartObj = { ...get(cart) };
    if (ticket.type === 'from') {
      cartObj.from = ticket.obj;
    }
    if (ticket.type === 'to') {
      cartObj.to = ticket.obj;
    }
    set(cart, cartObj);
  },
});

export const price = selector({
  key: 'price',
  get: ({ get }) => {
    const cartValue = get(cart);
    let sum = 0;
    if (cartValue?.from?.price.price) {
      sum += parseFloat(cartValue?.from?.price.price);
    }
    if (cartValue?.to?.price.price) {
      sum += parseFloat(cartValue?.to?.price.price);
    }
    return sum;
  },
});
