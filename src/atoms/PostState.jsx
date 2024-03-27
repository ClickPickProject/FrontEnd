import axios from 'axios';
import { atom, selectorFamily } from 'recoil';

export const postState = atom({
  key: 'postState',
  getPromise: {
    nickname: '',
    title: '',
    content: '',
    date: '',
    likeCount: 0,
    viewCount: 0,
    position: '',
    photoDate: '',
    hashTags: [''],
  },
});

export const commentsState = atom({
  key: 'commentsState',
  default: [],
});

export const postEditModeState = atom({
  key: 'postEditModeState',
  default: false,
});

export const postTitleState = atom({
  key: 'postTitleState',
  default: '',
});

export const postContentState = atom({
  key: 'postContentState',
  default: '',
});

export const postHashtagState = atom({
  key: 'postHashtagState',
  default: '',
});

export const postCategoryNameState = atom({
  key: 'postCategoryNameState',
  default: '',
});
