import { atom } from 'recoil';

export const filterUserStatusState = atom({
  key: 'filterUserStatusState',
  default: {
    value: 'ALL',
    label: '모두',
  },
});

export const filterReportStatusState = atom({
  key: 'filterReportStatusState',
  default: {
    value: 'posts',
    label: '게시글',
  },
});
