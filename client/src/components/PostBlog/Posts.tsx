import styled from 'styled-components';
import Tag from './Tag';
import PostCard from './PostCard';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { ServerData } from '../Main/MainList';
const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 100vh;
`;
const API = `${process.env.REACT_APP_API_URL}`;

export interface TagInterface {
  tagName: string;
  count: number;
}

const Posts = () => {
  //전체 게시글 get하는 axios 작성하기
  //스켈레톤 ui도 작성하기
  const navigate = useNavigate();
  const { nickname } = useParams();

  //axios 로 받아온 해당 블로그 페이지 요소
  const [serverData, setServerData] = useState<ServerData[]>([]);
  const [tagData, setTagData] = useState<TagInterface[]>([]);
  const [selectedTag, setSelectedTag] = useState('');
  useEffect(() => {
    axios.get(`${API}/tag/${nickname}`).then((res) => {
      setTagData(res.data);
    });
  }, []);

  //여기서 태그에 선택에 따라 처리하기
  useEffect(() => {
    if (selectedTag === '') {
      axios.get(`${API}/${nickname}?page=1&size=16`).then((res) => {
        console.log(res.data.data);
        setServerData(res.data.data.reverse());
      });
    } else {
      axios.get(`${API}/tag/${nickname}/${selectedTag}?page=1&size=16`).then((res) => {
        console.log(res.data.data);
        setServerData(res.data.data.reverse());
      });
    }
  }, [selectedTag]);

  return (
    <PostsContainer>
      {tagData.length !== 0 ? (
        <Tag tag={tagData} selectedTag={selectedTag} setSelectedTag={setSelectedTag}></Tag>
      ) : null}
      {serverData.length !== 0
        ? serverData.map((el) => {
            return (
              <PostCard
                key={el.postId}
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
              ></PostCard>
            );
          })
        : null}
    </PostsContainer>
  );
};

export default Posts;
