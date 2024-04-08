import { atom } from 'recoil';

export const mapAreaState = atom({
  key: 'mapAreaState',
  default: {
    s: '',
    w: '',
    n: '',
    e: '',
  },
});

export const mapMarkerState = atom({
  key: 'mapMarkerState',
  default: [],
});

export const mapMenuState = atom({
  key: 'mapMenuState',
  default: '지도 홈',
});

export const placeDetailState = atom({
  key: 'placeDetailState',
  default: [],
});

export const placeListState = atom({
  key: 'placeListState',
  default: [],
});

export const placeBookmarkListState = atom({
  key: 'placeBookmarkListState',
  default: [],
});
