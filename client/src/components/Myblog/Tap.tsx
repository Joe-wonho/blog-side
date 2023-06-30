import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import Posts from './Posts';
import Series from './Series';
import { useRecoilState } from 'recoil';
import { selectedTap } from '../../recoil/tab';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const TapContainer = styled.div`
  margin: 48px 0 70px 0;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  @media screen and (max-width: 767px) {
    margin: 20px 0 90px;
    height: 30px;
  }
`;
const PostTab = styled.div<{ selected: string }>`
  width: 20%;
  height: 80%;
  display: flex;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 450;
  cursor: pointer;
  color: ${({ selected }) => (selected === 'post' ? 'var(--active)' : 'var(--dark-blue-800)')};
  border-bottom: ${({ selected }) => (selected === 'post' ? '0.2rem solid var(--active)' : 'none')};
  @media screen and (max-width: 767px) {
    font-size: 1.1rem;
    width: 120px;
    height: 30px;
  }
`;
const SeriesTab = styled.div<{ selected: string }>`
  width: 20%;
  height: 80%;
  display: flex;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 450;
  cursor: pointer;
  color: ${({ selected }) => (selected === 'series' ? 'var(--active)' : 'var(--dark-blue-800)')};
  border-bottom: ${({ selected }) => (selected === 'series' ? '0.2rem solid var(--active)' : 'none')};
  @media screen and (max-width: 767px) {
    font-size: 1.1rem;
    width: 120px;
    height: 30px;
  }
`;

const Tap = () => {
  const [selected, setSelected] = useRecoilState(selectedTap);
  const navigate = useNavigate();
  const handleSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    const eventTarget = e.target as HTMLDivElement;
    if (selected !== `${eventTarget.id}`) {
      setSelected(`${eventTarget.id}`);
      // navigate()
    }
  };
  return (
    <MainContainer>
      <TapContainer>
        <PostTab onClick={handleSelect} selected={selected} id='post'>
          글
        </PostTab>
        <SeriesTab onClick={handleSelect} selected={selected} id='series'>
          시리즈
        </SeriesTab>
      </TapContainer>
      {selected === 'post' ? <Posts></Posts> : <Series></Series>}
    </MainContainer>
  );
};

export default Tap;
