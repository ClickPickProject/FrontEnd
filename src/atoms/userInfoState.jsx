import { atom } from 'recoil';

export const userNameState = atom({
  key: 'userNameState',
  default: '',
});

export const userNickNameState = atom({
  key: 'userNickNameState',
  default: '',
});

export const userPhoneState = atom({
  key: 'userPhoneState',
  default: '',
});
