import React from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import axios from 'axios';
import { emailValidation, pwdValidation } from '../Signup/validation';
const LoginContainer = styled.div`
  padding: 0 24px;
  height: 100%;
  @media screen and (min-width: 768px) {
    width: 494px;
    padding: 0 48px;
  }
`;
const Title = styled.h1`
  font-size: 26px;
  font-weight: 700;
  line-height: 36.4px;
  color: rgb(32, 36, 41);
  margin-bottom: 20px;
  cursor: default;
`;

//submtBtn Box
const BtnBox = styled.div`
  margin-top: 60px;
  height: 210px;
  @media screen and (min-width: 768px) {
    width: 396px;
  }
  .or-tag {
    font-size: 14px;
    display: flex;
    flex-basis: 100%;
    align-items: center;
    margin: 8px 0;
    font-size: 14px;
    font-weight: 500;
    color: rgb(68, 68, 68);
    &::before,
    &::after {
      content: '';
      flex-grow: 1;
      background: rgba(0, 0, 0, 0.35);
      height: 1px;
      font-size: 0px;
      line-height: 0px;
    }
    &::before {
      margin-right: 16px;
    }
    &::after {
      margin-left: 16px;
    }
  }
`;
const LoginBtn = styled.button`
  border-radius: 0.3rem;
  padding: 4px 6px;
  width: 100%;
  height: 50px;
  font-size: 16px;
  font-weight: 700;
  line-height: 22.4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(90deg, var(--gray-blue-300), var(--gray-blue-400));
  color: rgb(255, 255, 255);
  @media screen and (max-width: 767px) {
    width: 60%;
    min-width: 300px;
    margin: auto;
  }
`;

const SignupBtn = styled.button`
  margin: 20px auto;
  padding: 4px 6px;
  width: 183px;
  height: 45px;
  font-size: 16px;
  font-weight: 700;
  line-height: 22.4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(90deg, var(--gray-blue-300), var(--gray-blue-400));
  color: #fff;
  border-radius: 0.25rem;
  &:hover {
  }
`;

const CustomLink = styled.div`
  display: flex;
  justify-content: center;
  .forgot-password {
    height: 20px;
    font-size: 14px;
    font-weight: 500;
    line-height: 19.6px;
    color: rgb(142, 142, 142);
    margin: 16px 0;
    &:hover {
      color: #111;
    }
  }
`;

const Login = () => {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const navigate = useNavigate();

  const onClickSignup = () => {
    navigate('/signup');
  };

  const onClickLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (emailValidation(loginForm.email)[0] === false || pwdValidation(loginForm.password)[0] === false) {
      alert('올바른 정보를 입력해주세요');
    } else {
      console.log(loginForm);
      //  이부분에서 서버와 통신하면 된다.
      // try {
      //   await axios.post('http://localhost:8080/login', loginForm);
      // } catch (err: any) {
      //   console.log('axios 에러');
      //   throw new Error(err);
      // }
    }
  };

  return (
    <LoginContainer>
      <Title>로그인이나 회원가입 해주세요</Title>
      <LoginForm loginForm={loginForm} setLoginForm={setLoginForm} />
      <BtnBox>
        <LoginBtn onClick={onClickLogin}>로그인</LoginBtn>
        <CustomLink>
          <span className='forgot-password'>비밀번호를 잊어버리셨나요?</span>
        </CustomLink>
        <SignupBtn onClick={onClickSignup}>회원가입</SignupBtn>
        <div className='or-tag'>혹은</div>
        <SignupBtn>카카오 로그인</SignupBtn>
      </BtnBox>
    </LoginContainer>
  );
};

export default Login;
