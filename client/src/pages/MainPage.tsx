import React from 'react';
import styled from 'styled-components';
import SideBar from '../components/SideBar';
import Main from '../components/Main';

const MainPageContainer = styled.div`
  padding: 80px 0 50px;
  min-height: 750px;
  display: flex;
  justify-content: center;
  background-color: var(--light-gray-150);
`;

const MainWrapper = styled.div`
  width: 100%;
  max-width: 1320px;
  min-width: 1024px;
  display: flex;
  flex-direction: row;
`;

const MainPage = () => {
  return (
    <MainPageContainer>
      <MainWrapper>
        <SideBar></SideBar>
        {/* 여기에 메인 컴포넌트 추가 */}
        <Main></Main>
      </MainWrapper>
    </MainPageContainer>
  );
};

export default MainPage;
