import { atom } from 'recoil';

export const filterUserStatusState = atom({
  key: 'filterUserStatusState',
  default: {
    value: 'ALL',
    label: '모두',
  },
});
