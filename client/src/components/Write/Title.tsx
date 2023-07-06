import { useState } from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { useRecoilState } from 'recoil';
import { titleAtom } from '../../recoil/write';

const TitleContainer = styled(TextareaAutosize)`
  display: block;
  width: 100%;
  min-width: 430px;
  font-size: 2.3rem;
  font-weight: 650;
  resize: none;
  outline: none;
  border: none;
  margin-bottom: 10px;
  background-color: var(--light-gray-100);
`;
const TitleBorder = styled.div`
  width: 100px;
  border-bottom: 5px solid var(--light-gray-400);
  margin-bottom: 20px;
`;

const Title = () => {
  const [title, setTitle] = useRecoilState(titleAtom);
  const handleTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };
  return (
    <>
      <TitleContainer placeholder='제목을 입력하세요' maxRows={5} onChange={handleTitle} value={title}></TitleContainer>
      <TitleBorder></TitleBorder>
    </>
  );
};

export default Title;
