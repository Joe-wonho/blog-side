import React from 'react';
import styled from 'styled-components';

// interface CreateTodoProps {}

const CreateTodoContainer = styled.div`
  height: 60px;
  width: 80%;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;

  .create-todo {
    width: 80%;
    max-width: 600px;
    height: 80%;
    background-color: var(--light-gray-200);
    box-shadow: 1px 1px 5px 0px var(--gray-blue-300);
    display: flex;
    border-radius: 0.8rem;
  }
`;

const TodoInput = styled.input`
  padding: 10px 0 10px 15px;
  flex-grow: 1;
  height: 100%;
  background-color: var(--light-gray-200);
  color: var(--dark-blue-700);
  font-size: 1rem;
  border-radius: 0.8rem;
`;

const SubmitBtn = styled.button`
  width: 50px;
  background-color: var(--light-gray-200);
`;

const CreateTodo = () => {
  return (
    <CreateTodoContainer>
      <div className='create-todo'>
        <TodoInput type='text' placeholder='할 일을 입력해주세요'></TodoInput>
        <SubmitBtn>+</SubmitBtn>
      </div>
    </CreateTodoContainer>
  );
};

export default CreateTodo;
