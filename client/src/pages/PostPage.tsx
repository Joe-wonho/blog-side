import styled from 'styled-components';
import Header from '../components/Header/Header';
import TapComponent from '../components/Common/Tap';
import Posts from '../components/PostBlog/Posts';
const Container = styled.div`
  padding-top: 80px;
  display: flex;
  justify-content: center;
  height: 100%;
  background-color: var(--light-gray-150);
  min-width: 400px;
  @media screen and (max-width: 767px) {
    padding: 40px 10px 0;
  }
`;

//1200 이상일 때 태그 목록 보여주기
const PageBody = styled.div`
  margin: 0 auto;
  width: 768px;
  /* height: 1300px; */
  display: flex;
  flex-direction: column;
`;

const PostPage = () => {
  return (
    <>
      <Header></Header>
      <Container>
        <PageBody>
          <TapComponent />
          <Posts></Posts>
        </PageBody>
      </Container>
    </>
  );
};

export default PostPage;
