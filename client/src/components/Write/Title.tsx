import { useState } from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

const TitleContainer = styled(TextareaAutosize)`
  display: block;
  width: 100%;
  font-size: 2.3rem;
  font-weight: 650;
  resize: none;
  outline: none;
  border: none;
  margin-bottom: 10px;
`;
const TitleBorder = styled.div`
  width: 100px;
  border-bottom: 5px solid var(--light-gray-400);
  margin-bottom: 20px;
`;

const Title = () => {
  return (
    <>
      <TitleContainer placeholder='제목을 입력하세요' maxRows={5}></TitleContainer>
      <TitleBorder></TitleBorder>
    </>
  );
};

export default Title;
