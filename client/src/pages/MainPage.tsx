import styled from 'styled-components';
import Header from '../components/Header/Header';
import MainList from '../components/Main/MainList';
const Body = styled.div`
  height: 100vh;
  background-color: var(--light-gray-150);
`;
const MainPageContainer = styled.div`
  /* height: 100%; */
  display: flex;
  justify-content: center;
  background-color: var(--light-gray-150);
  padding-top: 50px;
  padding-bottom: 20px;
  min-width: 400px;
`;

const MainPage = () => {
  return (
    <>
      <Header></Header>
      <Body>
        <MainPageContainer>
          <MainList></MainList>
        </MainPageContainer>
      </Body>
    </>
  );
};

export default MainPage;
