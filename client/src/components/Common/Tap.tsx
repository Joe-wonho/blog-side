import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import { useRecoilState } from 'recoil';
import { selectedTap } from '../../recoil/tab';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
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
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const TapContainer = styled.div`
  /* margin: 48px 0 70px 0; */
  margin-top: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  @media screen and (max-width: 767px) {
    /* margin: 20px 0 90px; */
    margin-top: 20px;
    height: 30px;
  }
`;
const PostTab = styled.div<{ selected: string }>`
  width: 48%;
  height: 80%;
  display: flex;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 450;
  cursor: pointer;
  transition: color 0.3s ease-in-out;
  color: ${({ selected }) => (selected === 'post' ? 'var(--active)' : 'var(--dark-blue-800)')};
  @media screen and (max-width: 767px) {
    font-size: 1.1rem;
    height: 30px;
  }
`;
const SeriesTab = styled.div<{ selected: string }>`
  width: 48%;
  height: 80%;
  display: flex;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 450;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  color: ${({ selected }) => (selected === 'series' ? 'var(--active)' : 'var(--dark-blue-800)')};
  @media screen and (max-width: 767px) {
    font-size: 1.1rem;
    height: 30px;
  }
`;
const Border = styled.div<{ selected: string }>`
  height: 0.2rem;
  background-color: var(--active);
  margin-bottom: 70px;
  width: 50%;
  transform: ${({ selected }) => (selected === 'series' ? 'translateX(100%)' : 'translateX(0)')};
  transition: transform 0.3s ease-in-out;
`;
const API = `${process.env.REACT_APP_API_URL}`;

export interface WriterInterface {
  nickname: string;
  profile: string;
}

const Tap = () => {
  const [selected, setSelected] = useRecoilState(selectedTap);
  const [writerInfo, setWriterInfo] = useState<WriterInterface>();
  const navigate = useNavigate();
  const { nickname } = useParams();

  useEffect(() => {
    axios.get(`${API}/check/${nickname}`).then((res) => {
      setWriterInfo({ nickname: res.data.nickname, profile: res.data.profile });
      // setSelected('post');
    });
  }, []);

  const handleSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    const eventTarget = e.target as HTMLDivElement;
    if (selected !== `${eventTarget.id}`) {
      console.log(eventTarget.id);
      setSelected(`${eventTarget.id}`);
      if (eventTarget.id === 'post') {
        navigate(`/${nickname}`);
      } else {
        navigate(`/${nickname}/series`);
      }
    }
  };
  return (
    <>
      <MyInfo>
        {writerInfo && (
          <>
            <img src={writerInfo.profile} alt='profile' className='profile'></img>
            <p>{writerInfo.nickname}</p>
          </>
        )}
      </MyInfo>
      <MainContainer>
        <TapContainer>
          <PostTab onClick={handleSelect} selected={selected} id='post'>
            글
          </PostTab>
          <SeriesTab onClick={handleSelect} selected={selected} id='series'>
            시리즈
          </SeriesTab>
        </TapContainer>
        <Border selected={selected}></Border>
      </MainContainer>
    </>
  );
};

export default Tap;
