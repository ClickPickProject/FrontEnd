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

export const reportModalState = atom({
  key: 'reportModalState',
  default: false,
});

export const replyCommentCheckState = atom({
  key: 'replyCommentCheckState',
  default: false,
});
