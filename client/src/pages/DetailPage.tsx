import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import Detail from '../components/Detail/Detail';
const Box = styled.div``;
const DetailPageContainer = styled.div`
  width: 768px;
  height: 100%;
  margin: 5rem auto 0;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 799px) {
    margin-top: 2rem;
    width: 100%;
    min-width: 430px;
    padding: 0 20px;
  }
`;

const DetailPage = () => {
  return (
    <Box>
      <Header></Header>
      <DetailPageContainer>
        <Detail></Detail>
      </DetailPageContainer>
    </Box>
  );
};

export default DetailPage;
