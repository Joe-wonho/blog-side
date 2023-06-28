import React from 'react';
import styled from 'styled-components';
import ThumbnailImg from '../../assets/test.png';

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
  @media screen and (min-width: 768px) {
    height: 402px;
    background-color: red;
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
const PostCard = () => {
  return (
    <>
      <PostCardContainer>
        <Thumbnail>
          <img className='thumbnail-img' src={ThumbnailImg} alt='ThumbnailImg' />
        </Thumbnail>
        <Title>포스팅 제목</Title>
        <Desc>
          포스팅내용 이번에 토이 프로젝트를 진행하며 드롭다운을 구현하던 도중드롭다운 메뉴 외부를 클릭하면 어떻게 드롭다운을 닫을지 고민하다가
          작성하게 되었다!useRef를 이용해서 DropdownContainer라는 div 엘리먼트에 접근.document에 onCheckClickOutsi이번에 토이 프로젝트를 진행하며
          드롭다운을 구현하던 도중드롭다운 메뉴 외부를 클릭하면 어떻게 드롭다운을 닫을지 고민하다가 작성하게 되었다!useRef를 이용해서
          DropdownContainer라는 div 엘리먼트에 접근.document에 onCheckClickOutsi
        </Desc>
        <TagBox>
          <Tag>111</Tag>
          <Tag>223455</Tag>
        </TagBox>
        <CreatedAt>작성날짜</CreatedAt>
      </PostCardContainer>
      <Hrtag />
    </>
  );
};

export default PostCard;
