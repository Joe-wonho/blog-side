import React from 'react';
import styled from 'styled-components';
import Write from '../components/Write/Write';
const WritePageContainer = styled.div`
  background-color: var(--light-gray-100);
  min-height: 100vh;
  /* height: 100%; */
  min-width: 430px;
  overflow: hidden;
`;

const WritePage = () => {
  return (
    <WritePageContainer>
      <Write></Write>
    </WritePageContainer>
  );
};

export default WritePage;
