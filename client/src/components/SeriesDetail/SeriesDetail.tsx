import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SeriesDetailCard from './SeriesDetailCard';
import { useParams } from 'react-router';
import axios from 'axios';
import { ServerData } from '../Main/MainList';
const SeriesDetailContainer = styled.div``;
const SeriesName = styled.div`
  border-bottom: 1px solid var(--light-gray-300);
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 20px;
  padding-bottom: 20px;
  pre {
    width: 43px;
    color: var(--active);
    font-size: 1rem;
    font-weight: 650;
    padding-bottom: 4px;
    border-bottom: 3px solid var(--active);
  }
  p {
    font-size: 1.8rem;
    font-weight: 600;
  }
  @media screen and (max-width: 767px) {
    p {
      font-size: 1.4rem;
      font-weight: 650;
    }
  }
`;
const BtnArea = styled.div`
  height: 90px;
`;
const API = `${process.env.REACT_APP_API_URL}`;

const SeriesDetail = () => {
  const [serverData, setServerData] = useState<ServerData[]>([]);
  const { seriesName } = useParams();
  const pathName: string = decodeURI(window.location.pathname);

  useEffect(() => {
    axios.get(`${API}${pathName}?page=1&size=16`).then((res) => {
      setServerData(res.data.post.reverse());
    });
  }, []);
  return (
    <SeriesDetailContainer>
      <SeriesName>
        <pre>시리즈</pre>
        <p>{seriesName}</p>
      </SeriesName>
      <BtnArea></BtnArea>
      {serverData.length !== 0
        ? serverData.map((el) => {
            return (
              <SeriesDetailCard
                title={el.title}
                content={el.content}
                createdAt={el.createdAt}
                nickname={el.nickname}
                postId={el.postId}
                series={el.series}
                tag={el.tag}
                profile={el.profile}
                userId={el.userId}
                thumbnail={el.thumbnail}
                key={el.postId}
              ></SeriesDetailCard>
            );
          })
        : null}
    </SeriesDetailContainer>
  );
};

export default SeriesDetail;
