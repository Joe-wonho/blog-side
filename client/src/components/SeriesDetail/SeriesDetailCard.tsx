import React from 'react';
import styled from 'styled-components';
import Dompurify from 'dompurify';
import { ServerData } from '../Main/MainList';
import { changeDate } from '../Common/changeDate';
import { useNavigate } from 'react-router';

const Title = styled.h2`
  height: 24px;
  font-size: 18px;
  display: flex;
  font-weight: 700;
  margin-bottom: 10px;
  span {
    transition: all 0.1s ease-in-out;
    cursor: pointer;
    :hover {
      color: var(--active);
      border-bottom: 3px solid var(--active);
    }
  }
  @media screen and (min-width: 768px) {
    font-size: 22px;
  }
`;
const PostCardContainer = styled.div`
  display: flex;
  width: 765px;
  /* height: 635px; */
  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
  }
`;
const Thumbnail = styled.div`
  .thumbnail-img {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    cursor: pointer;
  }
  @media screen and (min-width: 768px) {
    width: 210px;
    .thumbnail-img {
      width: 100%;
    }
  }
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 768px) {
    margin-left: 10px;
    justify-content: space-between;
  }
`;
const Desc = styled.p`
  /* margin-bottom: 15px; */
  font-size: 14px;
  height: 42px;
  line-height: 21px;
  font-weight: 450;
  //텍스트 너비에 맞춰서 흘러넘치지 않게하기
  white-space: pre-line;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  @media screen and (min-width: 768px) {
    margin: 0;
    height: 72px;
    font-size: 15px;
    line-height: 24px;
  }
`;
const CreatedAt = styled.div`
  height: 18px;
  font-size: 13px;
  color: var(--gray-700);
`;
const Hrtag = styled.div`
  height: 20px;
  border-bottom: 1px solid var(--light-gray-200);
  margin-bottom: 20px;
  @media screen and (max-width: 767px) {
    margin-bottom: 20px;
    height: 20px;
    border-bottom: 1.5px solid var(--light-gray-300);
  }
`;
const SeriesDetailCard = ({
  title,
  content,
  createdAt,
  profile,
  nickname,
  postId,
  series,
  tag,
  userId,
  thumbnail,
}: ServerData) => {
  const navigate = useNavigate();
  const handleGoDetail = (e: React.MouseEvent<HTMLImageElement | HTMLHeadingElement>) => {
    e.preventDefault();
    navigate(`/${nickname}/${postId}`);
  };
  return (
    <>
      <Title>
        <span onClick={handleGoDetail}>{title}</span>
      </Title>
      <PostCardContainer>
        <Thumbnail>
          <img onClick={handleGoDetail} className='thumbnail-img' src={thumbnail} alt='ThumbnailImg' />
          {/* <img onClick={handleGoDetail} className='thumbnail-img' src={thumbnail} alt='ThumbnailImg' /> */}
        </Thumbnail>
        <Box>
          <Desc
            dangerouslySetInnerHTML={{
              __html: Dompurify.sanitize(content.replace(/<(\/img|img)([^>]*)>/gi, '')),
            }}
          />
          <CreatedAt>{changeDate(createdAt)}</CreatedAt>
        </Box>
      </PostCardContainer>
      <Hrtag />
    </>
  );
};

export default SeriesDetailCard;
