import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SeriesCard from './SeriesCard';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';

const SeriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  padding-bottom: 20px;
  min-height: 100vh;
`;

export interface SeriesDataInterface {
  banner: string;
  count: number;
  seriesName: string;
}
const API = `${process.env.REACT_APP_API_URL}`;

const Series = () => {
  const navigate = useNavigate();
  const { nickname } = useParams();
  const [serverData, setServerData] = useState<SeriesDataInterface[]>([]);

  useEffect(() => {
    axios.get(`${API}/${nickname}/series?page=1&size=16`).then((res) => {
      console.log(res.data);
      setServerData(res.data.data);
    });
  }, []);
  return (
    <SeriesContainer>
      {serverData.length !== 0
        ? serverData.map((el, idx) => {
            return <SeriesCard key={idx} banner={el.banner} count={el.count} seriesName={el.seriesName}></SeriesCard>;
          })
        : null}
    </SeriesContainer>
  );
};

export default Series;
