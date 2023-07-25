import React from 'react';
import styled from 'styled-components';
import { SeriesDataInterface } from './Series';
import { useNavigate } from 'react-router';

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
  .thumbnail-img {
    aspect-ratio: 16/9;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  @media screen and (min-width: 768px) {
    height: 195px;
    .thumbnail-img {
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
  font-weight: 600;
  @media screen and (min-width: 768px) {
    height: 20px;
    font-size: 15px;
    padding: 8px 0;
  }
`;

const SeriesCard = ({ banner, count, seriesName }: SeriesDataInterface) => {
  const navigate = useNavigate();
  const handleGoSeriesDetail = () => {
    navigate(`${seriesName}`);
  };
  return (
    <SeriesCardContainer>
      <Thumbnail>
        <img onClick={handleGoSeriesDetail} className='thumbnail-img' src={banner} alt='ThumbnailImg' />
      </Thumbnail>
      <Title onClick={handleGoSeriesDetail}>{seriesName}</Title>
      <CreatedAt>{count}개의 포스트</CreatedAt>
    </SeriesCardContainer>
  );
};

export default SeriesCard;
