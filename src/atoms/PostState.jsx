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
