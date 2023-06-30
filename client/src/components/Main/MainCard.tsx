import React from 'react';
import styled from 'styled-components';
import ThumbnailImg from '../../assets/test.png';
import ProfileImg from '../../assets/profile.png';

const MainCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 377px;
  border: 1px solid red;
  border-radius: 5px;

  @media screen and (min-width: 662px) and (max-width: 1023px) {
    width: 48%;
  }
  @media screen and (max-width: 661px) {
    width: 100%;
  }
`;

const Thumbnail = styled.div`
  margin-bottom: 10px;
  @media screen and (min-width: 1024px) {
    .thumbnail-img {
      width: 100%;
      height: 180px;
      object-fit: cover;
    }
  }
`;
const Title = styled.h4`
  display: flex;
  align-items: center;
  font-weight: 600;
  height: 36px;
  font-size: 22px;
  @media screen and (min-width: 1024px) {
    height: 24px;
    font-size: 16px;
  }
`;

const Desc = styled.p`
  margin: 8px 0 24px;
  font-size: 14px;
  /* height: 63px; */
  /* line-height: 21px; */
  font-weight: 450;
  //텍스트 너비에 맞춰서 흘러넘치지 않게하기
  white-space: pre-line;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  //
  @media screen and (min-width: 1024px) {
    margin: 4px 0 10px;
    font-size: 14px;
    height: 63px;
    line-height: 21px;
  }
`;

const CreatedAt = styled.div`
  height: 18px;
  font-size: 13px;
  color: var(--gray-700);

  @media screen and (min-width: 1024px) {
    height: 18px;
  }
`;

const WriterInfo = styled.div`
  display: flex;
  cursor: pointer;
  .people-icon {
    border-radius: 50%;
    width: 45px;
    height: 45px;
  }
  @media screen and (min-width: 1024px) {
    flex-grow: 1;
    align-items: center;
    .people-icon {
      border-radius: 50%;
      width: 26px;
      height: 26px;
    }
  }
`;

const MainCard = () => {
  return (
    <MainCardContainer>
      <Thumbnail>
        <img className='thumbnail-img' src={ThumbnailImg} alt='ThumbnailImg' />
      </Thumbnail>
      <Title>포스팅 제목</Title>
      <Desc>
        포스팅내용 이번에 토이 프로젝트를 진행하며 드롭다운을 구현하던 도중드롭다운 메뉴 외부를 클릭하면 어떻게 드롭다운을 닫을지 고민하다가 작성하게
        되었다!useRef를 이용해서 DropdownContainer라는 div 엘리먼트에 접근.document에 onCheckClickOutsi이번에 토이 프로젝트를 진행하며 드롭다운을
        구현하던 도중드롭다운 메뉴 외부를 클릭하면 어떻게 드롭다운을 닫을지 고민하다가 작성하게 되었다!useRef를 이용해서 DropdownContainer라는 div
        엘리먼트에 접근.document에 onCheckClickOutsi
      </Desc>
      <CreatedAt>2023년 6월 23일</CreatedAt>
      <WriterInfo>
        <img src={ProfileImg} alt='profile-icon' className='people-icon'></img>
      </WriterInfo>
    </MainCardContainer>
  );
};

export default MainCard;
