import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { TagAreaContainer, TagItem, TagBox } from '../Write/TagArea';
import Viewer from './Viewer';
import profile from '../../assets/profile.png';

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const PostTitle = styled.h1`
  font-size: 2rem;
  font-weight: 650;
  color: var(--dark-blue-800);
`;
const EditBtnGrop = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: end;
  gap: 10px;
`;
const CommonBtn = styled.button`
  font-size: 1rem;
  font-weight: 550;
  color: var(--light-gray-400);
`;

const WriterName = styled.div`
  font-size: 1rem;
  color: var(--dark-blue-800);
  display: flex;
  font-weight: 500;
  margin-top: 15px;
  .writer-name {
    cursor: pointer;
    font-weight: 650;
  }
  .divider {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
  }
`;

const TagSection = styled.div`
  margin: 15px 0;
`;

const SeriesSection = styled.div<{ open: boolean }>`
  background-color: var(--light-gray-200);
  height: 122px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  flex-shrink: 0;
  .series-title {
    font-size: 1.5rem;
    font-weight: 600;
  }
  .list-toggle {
    cursor: pointer;
    width: 65px;
    font-size: 0.9rem;
    font-weight: 500;
    span {
      font-size: 1.3rem;
    }
  }
  ${({ open }) =>
    open &&
    css`
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    `}
`;
const SeriesList = styled.div<{ open: boolean }>`
  display: none;
  ${({ open }) =>
    open &&
    css`
      display: flex;
    `}
  width: 100%;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--dark-blue-800);
  flex-direction: column;
  background-color: var(--light-gray-200);
  padding: 0 15px 15px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;
const SeriesUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 172px;
  overflow-y: auto;
`;
const SeriesItem = styled.li`
  padding: 0 5px 5px;
  border-bottom: 1px solid var(--light-gray-300);
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  height: 28px;
  &.active {
    border-radius: 8px;
    background-color: var(--blue100);
    color: white;
  }
`;

const WriterInfo = styled.div`
  border-bottom: 1px solid var(--light-gray-300);
  display: flex;
  align-items: center;
  gap: 20px;
  padding-bottom: 30px;
  .profile {
    width: 110px;
    height: 110px;
    border-radius: 50%;
  }
  p {
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

const tagList = ['1번', '2번', '3번'];
const seriesLista = ['시리즈', '잘되니', '되야지'];
//여기서 api로 받아오자
const Detail = () => {
  const [openSeries, setSeries] = useState(false);
  const [seriesList, setSeriesList] = useState(seriesLista);
  const [selectedSeries, setSelectedSeries] = useState();

  //   const handleClickSelectSerires = (e: React.MouseEvent<HTMLLIElement>) => {
  //     setSelectedSeries(e.currentTarget.textContent);
  //   };
  return (
    <DetailContainer>
      <PostTitle> 글 제목</PostTitle>
      <EditBtnGrop>
        <CommonBtn>수정</CommonBtn>
        <CommonBtn>삭제</CommonBtn>
      </EditBtnGrop>
      <WriterName>
        <p className='writer-name'>작성자 아이디</p>
        <div className='divider'>•</div>
        <p>2023년 6월 23일</p>
      </WriterName>
      <TagSection>
        <TagBox>
          {tagList.map((tagItem, index) => {
            return (
              <TagItem key={index}>
                <div>{tagItem}</div>
              </TagItem>
            );
          })}
        </TagBox>
      </TagSection>
      <SeriesSection open={openSeries}>
        <div className='series-title'>시리즈이름</div>
        <div
          onClick={() => {
            setSeries(!openSeries);
          }}
          className='list-toggle'
        >
          <span>▾</span> 목록보기
        </div>
      </SeriesSection>
      <SeriesList open={openSeries}>
        <SeriesUl>
          {seriesList &&
            seriesList.map((el, idx) => {
              return (
                <SeriesItem
                  className={el === selectedSeries ? 'active' : ''}
                  key={idx}
                  // onClick={handleClickSelectSerires}
                >
                  {el}
                </SeriesItem>
              );
            })}
        </SeriesUl>
      </SeriesList>
      <Viewer></Viewer>
      <WriterInfo>
        <img src={profile} alt='profile' className='profile'></img>
        <p>작성자 닉네임</p>
      </WriterInfo>
    </DetailContainer>
  );
};

export default Detail;
