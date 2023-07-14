import React from 'react';
import styled from 'styled-components';
import EditPost from '../components/EditPost/EditPost';
const EditPageContainer = styled.div`
  background-color: var(--light-gray-100);
  min-height: 100vh;
  /* height: 100%; */
  min-width: 430px;
  overflow: hidden;
`;

const EditPostPage = () => {
  return (
    <EditPageContainer>
      <EditPost></EditPost>
    </EditPageContainer>
  );
};

export default EditPostPage;
