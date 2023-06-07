import React from 'react';
import styled from 'styled-components';
import { useParams, useLocation } from 'react-router';
// interface LoginPageProps {
// }

const LoginPageContainer = styled.div``;

const LoginPage = () => {
  const { login } = useParams();
  const location = useLocation();
  console.log(login);
  console.log(location);
  return (
    <LoginPageContainer>
      <h1> 로그인 페이지 </h1>
    </LoginPageContainer>
  );
};

export default LoginPage;
