import React from 'react';
import styled from 'styled-components';
// interface TodoProps {}

const TodoContainer = styled.div`
  width: 94%;
  height: 50px;
  background-color: var(--gray-blue-200);
  box-shadow: 1px 1px 5px 0px var(--gray-blue-300);
  display: flex;
  align-items: center;
  color: var(--dark-blue-700);
`;

const CheckBox = styled.div`
  border: 1px solid black;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
`;

const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95%;
  font-size: 18px;
  flex-grow: 1;
  cursor: default;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  width: 70px;
  height: 30px;
  gap: 10px;
  button {
    color: var(--dark-blue-700);
  }
`;

const Todo = () => {
  return (
    <TodoContainer>
      <CheckBox>V</CheckBox>
      <ContentBox>할일 내용</ContentBox>
      <BtnBox>
        <button>수정</button>
        <button>삭제</button>
      </BtnBox>
    </TodoContainer>
  );
};

export default Todo;
