import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export interface Post {
  content: string;
  createdAt: string;
  nickname: string;
  postId: number;
  series: string | null;
  tag: string[] | [];
  userId: number;
  thumbnail: string;
  title: string;
  profile: string;
}

//태그
export const postsAtom = atom<Post[]>({
  key: 'posts',
  default: [],
});
