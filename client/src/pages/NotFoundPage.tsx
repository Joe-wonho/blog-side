import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
const NotFoundPageContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: var(--light-gray-100);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  .one {
    font-size: 2.5rem;
    font-weight: 600;
  }
  .two {
    font-size: 2rem;
    font-weight: 500;
  }
`;
const HomeBtn = styled.button`
  width: 150px;
  height: 60px;
  padding: 8px 15px;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 550;
  color: white;
  background-color: var(--active);
`;

const NotFoundPage = () => {
  const navigate = useNavigate();
  const onClickHome = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/');
  };
  return (
    <NotFoundPageContainer>
      <div className='one'>404</div>
      <div className='two'>페이지가 존재하지 않습니다.</div>
      <div>
        <HomeBtn onClick={onClickHome}>BACK HOME</HomeBtn>
      </div>
    </NotFoundPageContainer>
  );
};

export default NotFoundPage;
