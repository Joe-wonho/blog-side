import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

//제목 title
export const titleAtom = atom({
  key: 'title',
  default: '',
  // effects_UNSTABLE: [persistAtom],
});

//태그
export const tagAtom = atom<string[]>({
  key: 'tag',
  default: [],
});

// 내용
export const contentAtom = atom<string>({
  key: 'content',
  default: '',
});

//시리즈 목록
export const seriesListAtom = atom<string[]>({
  key: 'seriesList',
  default: [],
});
//썸네일 이미지
export const thumbnailImgAtom = atom<FileList | null>({
  key: 'seriesImg',
  default: null,
  dangerouslyAllowMutability: true,
});
// 제출할 시리즈 이름
export const selectedSeriesAtom = atom<string>({
  key: 'selectedSeries',
  default: '',
});
