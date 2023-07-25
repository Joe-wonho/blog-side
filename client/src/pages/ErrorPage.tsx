import React from 'react';
import styled from 'styled-components';
import errorImg from '../assets/error.jpg';
interface ErrorPageProps {
  error: string;
}

const ErrorPageContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  z-index: 10;
  overflow: hidden;
  font-size: 2.5rem;
  font-weight: 600;
  img {
    width: 100%;
    height: 90vh;
  }
`;

const ErrorPage = ({ error }: ErrorPageProps) => {
  return (
    <ErrorPageContainer>
      <img src={errorImg} alt='error-img' />
      <div>{error}</div>
    </ErrorPageContainer>
  );
};

export default ErrorPage;
