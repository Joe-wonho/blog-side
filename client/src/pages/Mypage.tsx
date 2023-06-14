import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import MyInfo from '../components/Mypage/MyInfo';
const MypageContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: var(--dark-blue-900);
  /* background-color: var(--light-gray-150); */
`;
const MypageArea = styled.div`
  width: 790px;
  height: 820px;
  background-color: var(--white-100);
  display: flex;
  flex-direction: column;
`;

const Mypage = () => {
  return (
    <>
      <Header></Header>
      <MypageContainer>
        <MypageArea>
          <MyInfo></MyInfo>
        </MypageArea>
      </MypageContainer>
    </>
  );
};

export default Mypage;
