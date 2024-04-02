import { atom } from 'recoil';

export const mapAreaState = atom({
  key: 'mapAreaState',
  default: {
    s: '',
    w: '',
    n: '',
    e: '',
  },
});
