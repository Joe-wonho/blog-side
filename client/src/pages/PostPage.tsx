import styled from 'styled-components';
import Header from '../components/Header/Header';
import TapComponent from '../components/Myblog/Tap';
import { useRecoilValue } from 'recoil';
import { curUser } from '../recoil/signup';

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

const MyInfo = styled.div`
  height: 185px;
  border-bottom: 1px solid var(--light-gray-300);
  display: flex;
  align-items: center;
  gap: 20px;
  padding-bottom: 30px;
  .profile {
    width: 128px;
    height: 128px;
    border-radius: 50%;
  }
  p {
    font-size: 1.8rem;
    font-weight: 500;
  }
  @media screen and (max-width: 767px) {
    height: 152px;
    .profile {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    p {
      font-size: 1.3rem;
      font-weight: 500;
    }
  }
`;

const PostPage = () => {
  const currentUser = useRecoilValue(curUser);
  const { nickname, profile } = currentUser;
  return (
    <>
      <Header></Header>
      <Container>
        <PageBody>
          <MyInfo>
            <img src={profile} alt='profile' className='profile'></img>
            <p>{nickname}</p>
          </MyInfo>
          <TapComponent />
        </PageBody>
      </Container>
    </>
  );
};

export default PostPage;
