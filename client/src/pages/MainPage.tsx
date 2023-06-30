import styled from 'styled-components';
import MainCard from '../components/Main/MainCard';
import Header from '../components/Header/Header';

const MainPageContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: var(--light-gray-150);
  padding-top: 50px;
  min-width: 400px;
`;

const MainWrapper = styled.div`
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
    justify-content: center;
  }
  @media screen and (max-width: 661px) {
    width: 96%;
  }
`;

const MainPage = () => {
  return (
    <>
      <Header></Header>
      <MainPageContainer>
        <MainWrapper>
          <MainCard></MainCard>
          <MainCard></MainCard>
          <MainCard></MainCard>
          <MainCard></MainCard>
          <MainCard></MainCard>
          <MainCard></MainCard>
          <MainCard></MainCard>
          <MainCard></MainCard>
          <MainCard></MainCard>
          <MainCard></MainCard>
          <MainCard></MainCard>
        </MainWrapper>
      </MainPageContainer>
    </>
  );
};

export default MainPage;
