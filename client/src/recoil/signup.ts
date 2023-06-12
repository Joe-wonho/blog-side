import { atom } from 'recoil';

export interface ISignupForm {
  name: string;
  nickname: string;
  email: string;
  password: string;
}

// export interface ProfileImg {
//   profile: FileList | null;
// }

export const inputsState = atom<ISignupForm>({
  key: 'inputsState',
  default: {
    name: '',
    nickname: '',
    email: '',
    password: '',
  },
});

// export const profileImg = atom<ProfileImg>({
//   key: 'profileImg',
//   default: null,
// });
