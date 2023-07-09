import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styled, { css } from 'styled-components';
import { BiListPlus } from 'react-icons/bi';
import { CommonBtn } from './Write';
import { useRecoilState, useRecoilValue } from 'recoil';
import { curUser } from '../../recoil/signup';
import { dataURItoFile } from '../Common/tumbnailTofile';
import {
  titleAtom,
  tagAtom,
  contentAtom,
  thumbnailImgAtom,
  selectedSeriesAtom,
  seriesListAtom,
} from '../../recoil/write';
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
  padding: 80px 0;
  background-color: var(--light-gray-100);
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
`;
export const Desc = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--dark-blue-800);
`;

const SeriesPlus = styled.div<{ open: boolean }>`
  flex-shrink: 0;
  width: 100%;
  height: 50px;
  margin-top: 20px;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--dark-blue-800);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: var(--light-gray-200);
  opacity: 0.8;
  border-radius: 8px;
  ${({ open }) =>
    open &&
    css`
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    `}
  :hover {
    opacity: 1;
  }
`;

const SeriesList = styled.div<{ open: boolean }>`
  display: none;
  /* opacity: 0;
  height: 0; */
  ${({ open }) =>
    open &&
    css`
      display: flex;
    `}
  width: 100%;
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--dark-blue-800);
  /* display: flex; */
  flex-direction: column;
  background-color: var(--light-gray-200);
  padding: 15px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;
const SeriesInputBox = styled.div`
  display: flex;
  gap: 20px;
  .add-input {
    padding: 0 10px;
    display: block;
    width: 60%;
    min-width: 255px;
    height: 40px;
    font-size: 1.05rem;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  .add-btn {
    height: 40px;
    background-color: var(--blue100);
    color: white;
    padding: 0 8px;
    border-radius: 8px;
    font-size: 0.9rem;
    :hover {
      background-color: var(--blue200);
    }
  }
`;

const SeriesUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 192px;
  overflow-y: auto;
`;
const SeriesItem = styled.li`
  padding: 4px 5px;
  border-bottom: 1px solid var(--light-gray-300);
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  height: 32px;
  &.active {
    border-radius: 8px;
    background-color: var(--blue100);
    color: white;
  }
`;
const BtnBox = styled.div`
  display: flex;
  height: 42px;
  gap: 30px;
  margin: 30px auto 0;
`;

type SeriesAreaProps = {
  openCheck: boolean;
  setCheck(openCheck: boolean): void;
};
const SeriesArea = ({ openCheck, setCheck }: SeriesAreaProps) => {
  //시리즈 목록을 조회하는 아코디언
  const [openSeries, setSeries] = useState(false);
  const navigate = useNavigate();

  // 서버에서 받아온 시리즈 리스트
  const [seriesList, setSeriesList] = useRecoilState(seriesListAtom);
  // 서버에 제출할 선택된 시리즈이름 (폼데이터에 넣을것임)
  const [selectedSeries, setSelectedSeries] = useRecoilState(selectedSeriesAtom);
  // 시리즈 이름 작성
  const [seriesName, setSeriesName] = useState('');
  const handleSeriesName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeriesName(e.currentTarget.value);
  };

  const userInfo = useRecoilValue(curUser);
  //폼데이터
  const userId: string = String(userInfo.userId);
  const [title, setTitle] = useRecoilState(titleAtom);
  const [tag, setTag] = useRecoilState(tagAtom);
  const [content, setContent] = useRecoilState(contentAtom);
  const [thumbnailImg, setThumbnailImg] = useRecoilState(thumbnailImgAtom);

  //새로운 시리즈 추가
  const handleClickAddSeries = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!seriesList.includes(seriesName.trim()) && seriesName.trim() !== '') {
      setSeriesList([seriesName, ...seriesList]);
      setSeriesName('');
    }
  };
  //시리즈 선택
  const handleClickSelectSerires = (e: React.MouseEvent<HTMLLIElement>) => {
    if (e.currentTarget.textContent !== null) {
      setSelectedSeries(e.currentTarget.textContent);
    }
  };

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
      formData.append('thumbnail', thumbnailImg[0]);
    } else {
      formData.append('thumbnail', dataURItoFile());
    }
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }
    client
      .post('/post', formData, {
        headers: { 'content-type': 'multipart/form-data' },
      })
      .then((res) => {
        console.log(res);
        setTitle('');
        setTag([]);
        setContent('');
        setThumbnailImg(null);
        setSelectedSeries('');
        navigate(`/${userInfo.nickname}`);
      });
  };

  return (
    <CheckContainer openCheck={openCheck}>
      <ThumbnailContainer>
        <SeriesImg />
        <Desc> 시리즈 설정</Desc>
        <SeriesPlus
          open={openSeries}
          onClick={() => {
            setSeries(!openSeries);
          }}
        >
          <BiListPlus size='26' /> &nbsp;&nbsp;시리즈에 추가하기
        </SeriesPlus>
        <SeriesList open={openSeries}>
          <SeriesInputBox>
            <input
              onChange={handleSeriesName}
              value={seriesName}
              className='add-input'
              placeholder='새로운 시리즈 이름을 입력하세요'
            ></input>
            <button onClick={handleClickAddSeries} className='add-btn'>
              시리즈 추가
            </button>
          </SeriesInputBox>
          <SeriesUl>
            {seriesList &&
              seriesList.map((el, idx) => {
                return (
                  <SeriesItem
                    className={el === selectedSeries ? 'active' : ''}
                    key={idx}
                    onClick={handleClickSelectSerires}
                  >
                    {el}
                  </SeriesItem>
                );
              })}
          </SeriesUl>
        </SeriesList>
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
