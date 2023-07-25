import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const selectedTap = atom({
  key: 'selectedTap',
  default: 'post',
  effects_UNSTABLE: [persistAtom],
});
