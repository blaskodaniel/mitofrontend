import { atom } from 'recoil';

export const cart = atom({
  key: 'cart',
  default: {
    from: null,
    to: null,
  },
});
