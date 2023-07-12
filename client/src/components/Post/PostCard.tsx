import React from 'react';
import styled from 'styled-components';
import { ServerData } from '../Main/MainList';
import Dompurify from 'dompurify';
import { changeDate } from '../Common/changeDate';
import { useNavigate } from 'react-router';

const PostCardContainer = styled.div`
  height: 635px;
  display: flex;
  flex-direction: column;
  width: 767px;
  @media screen and (max-width: 767px) {
    height: auto;
    width: 100%;
  }
`;
const Hrtag = styled.div`
  height: 40px;
  border-bottom: 1.5px solid var(--light-gray-300);
  margin-bottom: 60px;
  @media screen and (max-width: 767px) {
    margin-bottom: 40px;
  }
`;
const Thumbnail = styled.div`
  margin-bottom: 10px;
  .thumbnail-img {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    cursor: pointer;
  }
  @media screen and (min-width: 768px) {
    height: 402px;
    .thumbnail-img {
      width: 100%;
      height: 100%;
    }
  }
`;
const Title = styled.h2`
  height: 24px;
  font-size: 18px;
  display: flex;
  align-items: center;
  font-weight: 700;
  cursor: pointer;

  @media screen and (min-width: 768px) {
    height: 36px;
    font-size: 22px;
  }
`;

const Desc = styled.p`
  margin: 8px 0 24px;
  font-size: 14px;
  height: 63px;
  line-height: 21px;
  font-weight: 400;
  //텍스트 너비에 맞춰서 흘러넘치지 않게하기
  white-space: pre-line;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  //
  @media screen and (min-width: 768px) {
    margin: 8px 0 32px;
    height: 72px;
    font-size: 16px;
    line-height: 24px;
  }
`;

const TagBox = styled.div`
  display: flex;
  gap: 15px;
  height: 33px;
  @media screen and (min-width: 768px) {
    height: 46px;
  }
`;
const Tag = styled.div`
  background-color: rgba(82, 95, 255, 0.8);
  padding: 0 12px;
  height: 24px;
  border-radius: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 14px;

  @media screen and (min-width: 768px) {
    padding: 0 16px;
    height: 32px;
    font-size: 16px;
  }
`;
const CreatedAt = styled.div`
  height: 18px;
  font-size: 14px;

  @media screen and (min-width: 768px) {
    height: 21px;
  }
`;
const PostCard = ({
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
      <PostCardContainer>
        <Thumbnail>
          <img onClick={handleGoDetail} className='thumbnail-img' src={thumbnail} alt='ThumbnailImg' />
        </Thumbnail>
        <Title onClick={handleGoDetail}>{title}</Title>
        <Desc
          dangerouslySetInnerHTML={{
            __html: Dompurify.sanitize(content.replace(/<(\/img|img)([^>]*)>/gi, '')),
          }}
        />
        <TagBox>
          {tag.length === 0 ? null : (
            <TagBox>
              {tag.map((tagItem, index) => {
                return (
                  <Tag key={index}>
                    <div>{tagItem}</div>
                  </Tag>
                );
              })}
            </TagBox>
          )}
        </TagBox>
        <CreatedAt>{changeDate(createdAt)}</CreatedAt>
      </PostCardContainer>
      <Hrtag />
    </>
  );
};

export default PostCard;
