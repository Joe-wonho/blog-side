import styled from 'styled-components';
import Tag from './Tag';
import PostCard from './PostCard';

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Posts = () => {
  //전체 게시글 get하는 axios 작성하기
  //스켈레톤 ui도 작성하기
  return (
    <PostsContainer>
      <Tag></Tag>
      <PostCard></PostCard>
      <PostCard></PostCard>
    </PostsContainer>
  );
};

export default Posts;
