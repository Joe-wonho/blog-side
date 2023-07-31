import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { postsAtom } from '../../recoil/posts';
import ErrorPage from '../../pages/ErrorPage';
import styled from 'styled-components';
import axios from 'axios';
import MainCard from './MainCard';
import MainSkeleton from './MainSkeleton';
const MainListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px 20px;
  @media screen and (min-width: 1357px) {
    width: 1342px; // 보더 지우면 2빼기
  }
  @media screen and (min-width: 1024px) and (max-width: 1356px) {
    width: 1002px;
  }
  @media screen and (min-width: 662px) and (max-width: 1023px) {
    width: 100%;
    margin-left: 20px;
  }
  @media screen and (max-width: 661px) {
    width: 96%;
  }
`;
const API = `${process.env.REACT_APP_API_URL}`;
const DummyData = [
  {
    userId: 1,
    nickname: '1번 사용자',
    postId: 100,
    content:
      '<p>1번 게시물 내용</p><p><img src="https://blog-side.s3.ap-northeast-2.amazonaws.com/%E1%84%90%E1%85%A6%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3%206%202.jpeg"></p><p>잘되네</p>',
    tag: ['1번', '태그'],
    series: '시리즈 더미',
    thumbnail:
      'https://blog-side.s3.ap-northeast-2.amazonaws.com/%E1%84%90%E1%85%A9%E1%84%8B%E1%85%B5%E1%84%87%E1%85%A6%E1%86%AF%202.png',
    title: '1번 제목',
    createdAt: '2023-07-10T14:04:58.581705',
  },
  {
    userId: 1,
    nickname: '1번 사용자',
    postId: 101,
    content:
      '<p>1번 게시물 내용</p><p><img src="https://blog-side.s3.ap-northeast-2.amazonaws.com/%E1%84%90%E1%85%A6%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3%206%202.jpeg"></p><p>잘되네</p>',
    tag: ['1번', '태그'],
    series: '시리즈 더미',
    thumbnail:
      'https://blog-side.s3.ap-northeast-2.amazonaws.com/%E1%84%90%E1%85%A9%E1%84%8B%E1%85%B5%E1%84%87%E1%85%A6%E1%86%AF%202.png',
    title: '1번 제목',
    createdAt: '2023-07-10T14:04:58.581705',
  },
  {
    userId: 1,
    nickname: '1번 사용자',
    postId: 102,
    content:
      '<p>1번 게시물 내용</p><p><img src="https://blog-side.s3.ap-northeast-2.amazonaws.com/%E1%84%90%E1%85%A6%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3%206%202.jpeg"></p><p>잘되네</p>',
    tag: ['1번', '태그'],
    series: '시리즈 더미',
    thumbnail:
      'https://blog-side.s3.ap-northeast-2.amazonaws.com/%E1%84%90%E1%85%A9%E1%84%8B%E1%85%B5%E1%84%87%E1%85%A6%E1%86%AF%202.png',
    title: '1번 제목',
    createdAt: '2023-07-10T14:04:58.581705',
  },
  {
    userId: 1,
    nickname: '1번 사용자',
    postId: 103,
    content:
      '<p>1번 게시물 내용</p><p><img src="https://blog-side.s3.ap-northeast-2.amazonaws.com/%E1%84%90%E1%85%A6%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3%206%202.jpeg"></p><p>잘되네</p>',
    tag: ['1번', '태그'],
    series: '시리즈 더미',
    thumbnail:
      'https://blog-side.s3.ap-northeast-2.amazonaws.com/%E1%84%90%E1%85%A9%E1%84%8B%E1%85%B5%E1%84%87%E1%85%A6%E1%86%AF%202.png',
    title: '1번 제목',
    createdAt: '2023-07-10T14:04:58.581705',
  },
  {
    userId: 1,
    nickname: '1번 사용자',
    postId: 104,
    content:
      '<p>1번 게시물 내용</p><p><img src="https://blog-side.s3.ap-northeast-2.amazonaws.com/%E1%84%90%E1%85%A6%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3%206%202.jpeg"></p><p>잘되네</p>',
    tag: ['1번', '태그'],
    series: '시리즈 더미',
    thumbnail:
      'https://blog-side.s3.ap-northeast-2.amazonaws.com/%E1%84%90%E1%85%A9%E1%84%8B%E1%85%B5%E1%84%87%E1%85%A6%E1%86%AF%202.png',
    title: '1번 제목',
    createdAt: '2023-07-10T14:04:58.581705',
  },
];

export interface ServerData {
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

const MainList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  //최초에 서버에서 불러온 포스트리스트
  const [serverData, setServerData] = useState<ServerData[]>([]);
  const [posts, setPosts] = useRecoilState(postsAtom);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    axios
      .get(`${API}?page=1&size=16`)
      .then((res) => {
        setServerData(res.data.data);
        setPosts(res.data.data);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, []);
  if (loading) {
    return (
      <MainListContainer>
        <MainSkeleton />
        <MainSkeleton />
        <MainSkeleton />
        <MainSkeleton />
        <MainSkeleton />
        <MainSkeleton />
        <MainSkeleton />
        <MainSkeleton />
      </MainListContainer>
    );
  }
  if (error !== '') {
    return <ErrorPage error={error}></ErrorPage>;
  }
  return (
    <MainListContainer>
      {serverData.length !== 0
        ? serverData.map((el) => {
            return (
              <MainCard
                title={el.title}
                content={el.content}
                createdAt={el.createdAt}
                nickname={el.nickname}
                postId={el.postId}
                series={el.series}
                tag={el.tag}
                profile={el.profile}
                userId={el.userId}
                thumbnail={el.thumbnail}
                key={el.postId}
              ></MainCard>
            );
          })
        : null}
    </MainListContainer>
  );
};

export default MainList;
