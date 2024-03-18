import { atom } from 'recoil';

export const editorTitleState = atom({
  key: 'editorTitleState',
  default: '',
});

export const editorContentState = atom({
  key: 'editorContentState',
  default: '',
});

export const editorTagState = atom({
  key: 'editorTagState',
  default: [],
});
