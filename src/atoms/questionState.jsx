import { atom } from 'recoil';

export const questionState = atom({
  key: 'questionState',
  getPromise: {
    nickname: '',
    title: '',
    content: '',
    date: '',
    likeCount: 0,
    viewCount: 0,
    photoDate: '',
    hashTags: [''],
  },
});

// export const commentsState = atom({
//   key: 'commentsState',
//   default: [],
// });

export const questionEditModeState = atom({
  key: 'questionEditModeState',
  default: false,
});

export const questionTitleState = atom({
  key: 'questionTitleState',
  default: '',
});

export const questionContentState = atom({
  key: 'questionContentState',
  default: '',
});

export const questionHashtagState = atom({
  key: 'questionHashtagState',
  default: '',
});

export const questionCategoryNameState = atom({
  key: 'questionCategoryNameState',
  default: '',
});
