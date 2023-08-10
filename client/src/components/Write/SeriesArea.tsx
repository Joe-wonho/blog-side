import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styled, { css } from 'styled-components';
import { CommonBtn } from './Write';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { curUser } from '../../recoil/signup';
import { selectedTap } from '../../recoil/tab';
import { thumbnailURItoFile } from '../Common/tumbnailTofile';
import { useParams } from 'react-router';
import {
  titleAtom,
  tagAtom,
  contentAtom,
  thumbnailImgAtom,
  selectedSeriesAtom,
  thumbnailUrlAtom,
  seriesListAtom,
} from '../../recoil/write';
import SeriesList from './SeriesList';
import SeriesImg from './SeriesImg';
import client from '../../api/axios';
const CheckContainer = styled.div<{ openCheck: boolean }>`
  transform: translateY(100%);
  transition: all 0.4s ease-in-out;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  opacity: 0;
  ${({ openCheck }) =>
    openCheck &&
    css`
      opacity: 1;
      transform: translateY(0);
    `}
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--light-gray-100);
  overflow: auto;
  @media screen and (max-width: 710px) {
    min-width: 430px;
    padding: 80px 20px;
  }
`;

const ThumbnailContainer = styled.div`
  width: 100%;
  max-width: 610px;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px 0;
`;
export const Desc = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--dark-blue-800);
`;

const BtnBox = styled.div`
  display: flex;
  height: 42px;
  gap: 30px;
  margin: 30px auto;
`;

type SeriesAreaProps = {
  openCheck: boolean;
  setCheck(openCheck: boolean): void;
};
const SeriesArea = ({ openCheck, setCheck }: SeriesAreaProps) => {
  const navigate = useNavigate();

  // 서버에 제출할 선택된 시리즈이름 (폼데이터에 넣을것)
  const [selectedSeries, setSelectedSeries] = useRecoilState(selectedSeriesAtom);

  const userInfo = useRecoilValue(curUser);
  //폼데이터
  const userId: string = String(userInfo.userId);
  const [title, setTitle] = useRecoilState(titleAtom);
  const [tag, setTag] = useRecoilState(tagAtom);
  const [content, setContent] = useRecoilState(contentAtom);
  const [thumbnailImg, setThumbnailImg] = useRecoilState(thumbnailImgAtom);
  const clearThumbnailUrl = useResetRecoilState(thumbnailUrlAtom);
  const clearSelectedTap = useResetRecoilState(selectedTap);

  const { postId } = useParams();
  // 출간하기 버튼 클릭
  const handleSubmit = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (title === '') {
      return alert('제목이 비었습니다');
    } else if (content === '') {
      return alert('내용이 비었습니다');
    }

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('title', title);
    formData.append('content', content);
    if (tag.length !== 0) {
      tag.map((el) => {
        formData.append('tag', el);
      });
    }
    if (selectedSeries !== '') {
      formData.append('series', selectedSeries);
    }
    if (thumbnailImg) {
      formData.append('thumbnail', thumbnailImg);
    } else {
      formData.append('thumbnail', thumbnailURItoFile());
    }
    if (postId) {
      client
        .patch(`/${postId}`, formData, {
          headers: { 'content-type': 'multipart/form-data' },
        })
        .then(() => {
          setTitle('');
          setTag([]);
          setContent('');
          setThumbnailImg(null);
          setSelectedSeries('');
          clearSelectedTap();
          clearThumbnailUrl();
          navigate(`/${userInfo.nickname}`);
        });
    } else {
      client
        .post('/post', formData, {
          headers: { 'content-type': 'multipart/form-data' },
        })
        .then(() => {
          setTitle('');
          setTag([]);
          setContent('');
          setThumbnailImg(null);
          setSelectedSeries('');
          clearSelectedTap();
          clearThumbnailUrl();
          navigate(`/${userInfo.nickname}`);
        });
    }
  };

  return (
    <CheckContainer openCheck={openCheck}>
      <ThumbnailContainer>
        <SeriesImg />
        <Desc> 시리즈 설정</Desc>
        <SeriesList></SeriesList>
        <BtnBox>
          <CommonBtn
            onClick={() => {
              setCheck(false);
            }}
            className='cancle-btn'
          >
            ✘ 취소
          </CommonBtn>
          <CommonBtn onClick={handleSubmit} className='submit-btn'>
            출간하기
          </CommonBtn>
        </BtnBox>
      </ThumbnailContainer>
    </CheckContainer>
  );
};

export default SeriesArea;
