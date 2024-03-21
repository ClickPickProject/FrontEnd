import { atom } from 'recoil';

export const parentCommentIdState = atom({
  key: 'parentCommentIdState',
  default: '',
});
export const parentCommentNickState = atom({
  key: 'parentCommentNickState',
  default: '',
});

export const topParentCommentState = atom({
  key: 'topParentCommentState',
  default: '',
});
