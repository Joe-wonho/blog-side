import React from "react";
import styled from "styled-components";
import Write from "../components/Write/Write";
const WritePageContainer = styled.div`
  background-color: var(--light-gray-100);
  height: 100vh;
  min-width: 430px;
`;

const WritePage = () => {
  return (
    <WritePageContainer>
      <Write></Write>
    </WritePageContainer>
  );
};

export default WritePage;
