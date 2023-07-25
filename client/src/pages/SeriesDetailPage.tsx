import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import SeriesDetail from '../components/SeriesDetail/SeriesDetail';
const SeriesDetailPageContainer = styled.div`
  padding: 80px 20px 0;
  display: flex;
  justify-content: center;
  height: 100%;
  min-height: 100vh;
  background-color: var(--light-gray-150);
  min-width: 808px;
  @media screen and (max-width: 767px) {
    padding: 40px 10px 0;
    min-width: 400px;
  }
`;
const PageBody = styled.div`
  margin: 0 auto;
  width: 768px;
  /* height: 1300px; */
  display: flex;
  flex-direction: column;
`;

const SeriesDetailPage = () => {
  return (
    <>
      <Header></Header>
      <SeriesDetailPageContainer>
        <PageBody>
          <SeriesDetail />
        </PageBody>
      </SeriesDetailPageContainer>
    </>
  );
};

export default SeriesDetailPage;
