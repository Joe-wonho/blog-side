import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// export const selectedTap = atom({
//     key: 'selectedTap',
//     default: 'post',
//     effects_UNSTABLE: [persistAtom],
//   });

//회원가입 폼 인터페이스
// export interface ISignupForm {
//   name: string;
//   nickname: string;
//   email: string;
//   password: string;
//   pwdCheck: string;
// }

// 회원가입 폼
// export const inputsState = atom<ISignupForm>({
//   key: 'inputsState',
//   default: {
//     name: '',
//     nickname: '',
//     email: '',
//     password: '',
//     pwdCheck: '',
//   },
// });

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

//시리즈 목록
export const seriesListAtom = atom<string[]>({
  key: 'seriesList',
  default: ['시리즈 더미', 'GOOD!'],
});
//시리즈 이미지
export const seriesImgAtom = atom<FileList | null>({
  key: 'seriesImg',
  default: null,
  dangerouslyAllowMutability: true,
});
// 제출할 시리즈 이름
export const selectedSeriesAtom = atom<string | null>({
  key: 'selectedSeries',
  default: '',
});
