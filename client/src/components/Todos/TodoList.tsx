import React from 'react';
import styled from 'styled-components';
import Todo from './Todo';
// interface TodoListProps {}

//2개들어가면 790 px 임
const TodoListContainer = styled.div`
  background-color: var(--light-gray-200);
  box-shadow: 1px 1px 5px 0px var(--gray-blue-300);
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 15px 0;
`;

const TodoList = () => {
  return (
    <TodoListContainer>
      <Todo></Todo>
      <Todo></Todo>
      <Todo></Todo>
    </TodoListContainer>
  );
};

export default TodoList;
