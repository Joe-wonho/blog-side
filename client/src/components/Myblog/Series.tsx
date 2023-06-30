import React from 'react';
import styled from 'styled-components';
import SeriesCard from './SeriesCard';
const SeriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
`;

const Series = () => {
  return (
    <SeriesContainer>
      <SeriesCard></SeriesCard>
      <SeriesCard></SeriesCard>
      <SeriesCard></SeriesCard>
      <SeriesCard></SeriesCard>
      <SeriesCard></SeriesCard>
    </SeriesContainer>
  );
};

export default Series;
