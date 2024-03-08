import axios from 'axios';
import { atom, selector, selectorFamily } from 'recoil';

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

export const postSelectorFamily = selectorFamily({
  key: 'postSelectorFamily',
  get: (params) => async () => {
    try {
      // const res = await axios.get(`${process.env.NEXT_PUBLIC_LOCAL_API_URL}/posts/${params}`);
      const res = await axios.get(`/api/post/${params}`);
      console.log(res);
      if (res.status === 200) {
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
  },
});
