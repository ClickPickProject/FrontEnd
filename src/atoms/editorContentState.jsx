import { atom } from 'recoil';

export const editorTitleState = atom({
  key: 'editorTitleState',
  default: '',
});

export const editorContentState = atom({
  key: 'editorContentState',
  default: '', // 초기값은 빈 문자열로 설정합니다.
});

export const editorTagState = atom({
  key: 'editorTagState',
  default: [],
});
