import React from 'react';
import styled from 'styled-components';
import ThumbnailImg from '../../assets/test.png';

const SeriesCardContainer = styled.div`
  width: 368px;
  height: 260px;
  @media screen and (max-width: 767px) {
    height: auto;
    width: 100%;
    margin-bottom: 20px;
  }
`;
const Thumbnail = styled.div`
  margin-bottom: 10px;
  @media screen and (min-width: 768px) {
    height: 195px;
    .thumbnail-img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
`;
const Title = styled.h2`
  height: 26px;
  font-size: 19px;
  display: flex;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    height: 24px;
    font-size: 18px;
  }
`;
const CreatedAt = styled.div`
  height: 22px;
  font-size: 15px;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    height: 20px;
    font-size: 15px;
    padding: 8px 0;
  }
`;
const SeriesCard = () => {
  return (
    <SeriesCardContainer>
      <Thumbnail>
        <img className='thumbnail-img' src={ThumbnailImg} alt='ThumbnailImg' />
      </Thumbnail>
      <Title>시리즈 제목</Title>
      <CreatedAt>작성날짜</CreatedAt>
    </SeriesCardContainer>
  );
};

export default SeriesCard;
