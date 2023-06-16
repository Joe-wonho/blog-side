import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

//회원가입 폼 인터페이스
export interface ISignupForm {
  name: string;
  nickname: string;
  email: string;
  password: string;
  pwdCheck: string;
}

// 회원가입 폼
export const inputsState = atom<ISignupForm>({
  key: 'inputsState',
  default: {
    name: '',
    nickname: '',
    email: '',
    password: '',
    pwdCheck: '',
  },
});

// 액세스 토큰
export let accessToken = atom({
  key: 'accessToken',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

// 로그인한 유저 정보
export interface CurrentUser {
  userId: number | null;
  name: string;
  nickname: string;
  email: string;
  profile: string;
}

export const curUser = atom<CurrentUser>({
  key: 'curUser',
  default: {
    userId: null,
    name: '',
    nickname: '',
    email: '',
    profile: '',
  },
  effects_UNSTABLE: [persistAtom],
});
