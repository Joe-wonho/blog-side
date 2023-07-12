import styled from 'styled-components';
import Title from './Title';
import TagArea from './TagArea';
import Editor from './Editor';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import SeriesArea from './SeriesArea';
const WriteContainer = styled.div<{ openCheck: boolean }>`
  /* display: flex; */
  display: ${({ openCheck }) => (openCheck ? 'none' : 'flex')};
  flex-direction: column;
  padding: 20px;
`;
const SubmitContainer = styled.div<{ openCheck: boolean }>`
  width: 100%;
  height: 60px;
  display: ${({ openCheck }) => (openCheck ? 'none' : 'flex')};
  /* display: flex; */
  justify-content: end;
  align-items: center;
  gap: 30px;
  padding: 20px;
  font-weight: 600;
`;
export const CommonBtn = styled.div`
  &.cancle-btn {
    color: var(--active);
    /* background-color: var(--light-gray-200); */
    border-radius: 8px;
    cursor: pointer;
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    :hover {
      background-color: var(--light-gray-200);
    }
  }
  &.submit-btn {
    background-color: var(--blue100);
    color: white;
    border-radius: 8px;
    cursor: pointer;
    padding: 10px 20px;
    border: 1px solid blue;
    display: flex;
    justify-content: center;
    align-items: center;
    :hover {
      background-color: var(--blue200);
    }
  }
`;

const Write = () => {
  const navigate = useNavigate();
  //시리즈창 온오프 설정
  const [openCheck, setCheck] = useState(false);
  const handleCancleBtn = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <WriteContainer openCheck={openCheck}>
        <Title></Title>
        <TagArea></TagArea>
        <Editor />
      </WriteContainer>
      <SubmitContainer openCheck={openCheck}>
        <CommonBtn
          onClick={() => {
            navigate(-1);
          }}
          className='cancle-btn'
        >
          ✘ 취소
        </CommonBtn>
        <CommonBtn
          className='submit-btn'
          onClick={() => {
            setCheck(true);
          }}
        >
          출간하기
        </CommonBtn>
      </SubmitContainer>
      <SeriesArea openCheck={openCheck} setCheck={setCheck}></SeriesArea>
    </>
  );
};

export default Write;
