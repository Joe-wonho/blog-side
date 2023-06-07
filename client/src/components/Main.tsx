import React from 'react';
import styled from 'styled-components';
import TodoList from './Todos/TodoList';
import CreateTodo from './Todos/CreateTodo';
import DonList from './Todos/DonList';
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
`;

const ListView = styled.div`
  /* border: 1px solid blue; */
  flex-grow: 1;
  min-width: 792px;
  display: flex;
  /* justify-content: space-between; */
  gap: 40px;
`;
// interface MainProps {}

const Main = () => {
  return (
    <>
      <MainContainer>
        <CreateTodo></CreateTodo>
        <ListView>
          <TodoList></TodoList>
          <DonList></DonList>
        </ListView>
      </MainContainer>
    </>
  );
};

export default Main;
