import { atom } from 'recoil';

export const pageState = atom({
  key: 'pageState',
  default: '',
});
export const pageDeleteModal = atom({
  key: 'pageDeleteModal',
  default: 'false',
});
