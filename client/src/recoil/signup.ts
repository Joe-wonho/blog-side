import { atom } from 'recoil';

export interface ISignupForm {
  name: string;
  nickname: string;
  email: string;
  password: string;
  pwdCheck: string;
}

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
