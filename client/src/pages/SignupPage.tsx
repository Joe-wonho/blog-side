import React from 'react';
import styled from 'styled-components';
import Signup from '../components/Signup/Signup';

const SignupPageContainer = styled.div`
  padding: 100px 0 30px;
  background-color: var(--light-gray-100);
  @media screen and (min-width: 768px) {
    height: auto;
  }
  @media screen and (max-width: 767px) {
    padding: 60px 0 0;
    background-color: var(--white-100);
  }
`;

const SignupPageBox = styled.div`
  background-color: var(--white-100);
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 768px) {
    width: 494px;
    /* height: 100%; */
    margin: 0 auto;
    border: 1px solid var(--light-gray-100);
    border-radius: 1rem;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    min-height: 738px;
    max-height: 834px;
  }
`;

const LogoBox = styled.div`
  height: 64px;
  @media screen and (min-width: 600px) {
    margin: 37px 0 10px 0;
  }
  @media screen and (max-width: 599px) {
    margin: 37px 0 10px 0;
  }
`;
const Logo = styled.div`
  width: 200px;
  height: 30px;
  cursor: default;
  font-size: 2rem;
  color: var(--dark-blue-500);
  padding-left: 24px;

  @media screen and (min-width: 768px) {
    width: 211px;
    padding-left: 48px;
  }
`;
const SignupPage = () => {
  return (
    <SignupPageContainer>
      <SignupPageBox>
        <LogoBox>
          <Logo>SIGN UP</Logo>
        </LogoBox>
        <Signup></Signup>
      </SignupPageBox>
    </SignupPageContainer>
  );
};

export default SignupPage;
