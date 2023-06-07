import React from 'react';
import styled from 'styled-components';
import profile from '../assets/profile.jpg';
// interface SideBarProps {}

const SideBarContainer = styled.div`
  width: 180px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-right: 50px;
  margin-top: 80px;
  /* justify-content: center; */
`;
const SideBarBox = styled.div`
  width: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid gray;
  background-color: var(--white-100);
  &.latest-info {
    flex-grow: 1;
  }
`;

const SideBarHead = styled.div`
  width: 100%;
  font-size: 1.3rem;
  height: 50px;
  background-color: var(--dark-blue-700);
  color: var(--light-gray-200);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Lists = styled.ul`
  li {
    margin: 10px 0;
  }
`;
const WeekList = styled.ul`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-evenly;
  align-items: center;
`;
const MemberHead = styled.div`
  font-size: 1.2rem;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--dark-blue-700);
  color: var(--light-gray-200);
  width: 100%;
`;
const MeberInfo = styled.div`
  font-size: 1rem;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
  gap: 15px;
  img {
    width: 40px;
    height: 40px;
  }
`;

const SideBar = () => {
  return (
    <>
      <SideBarContainer>
        <SideBarBox>
          <SideBarHead>Side PRJ</SideBarHead>
          <Lists>
            <li>사이드 프로젝트</li>
            <li>짧은 기능 소개</li>
          </Lists>
        </SideBarBox>

        <SideBarBox>
          <MemberHead className='member'>Member</MemberHead>
          <MeberInfo className='member-info'>
            <img src={profile} alt='프로필'></img>
            <p>유저이름</p>
          </MeberInfo>
        </SideBarBox>

        <SideBarBox className='latest-info'>
          <SideBarHead>최근 1주</SideBarHead>
          <WeekList>
            <li>오늘</li>
            <li>어제</li>
            <li>2일전</li>
            <li>3일전</li>
            <li>4일전</li>
            <li>5일전</li>
            <li>6일전</li>
            <li>7일전</li>
          </WeekList>
        </SideBarBox>
      </SideBarContainer>
    </>
  );
};

export default SideBar;
