import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import styled, { css } from 'styled-components';
import { BiListPlus } from 'react-icons/bi';
import { useRecoilState, useRecoilValue } from 'recoil';
import { curUser } from '../../recoil/signup';
import { selectedSeriesAtom, seriesListAtom } from '../../recoil/write';
import axios from 'axios';
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

const SeriesListBox = styled.div<{ open: boolean }>`
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
  max-height: 152px;
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
const API = `${process.env.REACT_APP_API_URL}`;

export interface SeriesInterFace {
  banner: string;
  count: number;
  seriesName: string;
}

const SeriesList = () => {
  const currentUser = useRecoilValue(curUser);
  const [openSeries, setSeries] = useState(false);

  // 서버에서 받아온 시리즈 리스트
  const [seriesList, setSeriesList] = useRecoilState(seriesListAtom);
  const [allSeries, setAllSeries] = useState([]);
  // 서버에 제출할 선택된 시리즈이름 (폼데이터에 넣을것임)
  const [selectedSeries, setSelectedSeries] = useRecoilState(selectedSeriesAtom);

  // 시리즈 input value
  const [seriesName, setSeriesName] = useState('');
  const handleSeriesName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeriesName(e.currentTarget.value);
  };

  const { postId } = useParams();

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

  useEffect(() => {
    axios.get(`${API}/${currentUser.nickname}/series?page=1&size=16`).then((res) => {
      const changeList: string[] = [];
      res.data.data.map((el: SeriesInterFace) => {
        changeList.push(el.seriesName);
      });
      setSeriesList(changeList);
    });
  }, []);
  return (
    <>
      <SeriesPlus
        open={openSeries}
        onClick={() => {
          setSeries(!openSeries);
        }}
      >
        <BiListPlus size='26' /> &nbsp;&nbsp;시리즈에 추가하기
      </SeriesPlus>
      <SeriesListBox open={openSeries}>
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
      </SeriesListBox>
    </>
  );
};

export default SeriesList;
