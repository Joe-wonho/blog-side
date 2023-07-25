import styled from 'styled-components';
import { emailValidation, pwdValidation } from '../Signup/validation';

const LoginFormContainer = styled.form``;

const InputBox = styled.div`
  height: 200px;
  font-weight: 500;
  hr {
    border: none;
    margin: 10px 0 10px;
  }
  @media screen and (min-width: 768px) {
    width: 395px;
  }

  label {
    height: 16px;
    font-size: 13px;
    line-height: 18.2px;
    color: rgb(109, 109, 109);
  }
  .input-box {
    height: 42px;
    margin: 2px 0 1px 0;
    display: flex;
    position: relative;
    input {
      flex-grow: 1;
      font-size: 15px;
      line-height: 21px;
      color: rgb(89, 95, 99);
      border-bottom: 0.1rem solid rgb(238, 238, 238);
    }
    input:focus ~ .hrtag::after {
      width: 100%;
      z-index: 1;
    }
  }
`;
const HrTag = styled.hr`
  border: 0px solid red;
  &::after {
    content: '';
    position: absolute;
    left: 0px;
    bottom: -1px;
    width: 0px;
    height: 1px;
    background: linear-gradient(90deg, var(--gray-blue-300), var(--gray-blue-400));
    transition: all 0.3s linear 0s;
  }
`;
const ValidDesc = styled.p`
  margin: 10px 0 10px;
  font-size: 11px;
  color: rgb(253, 91, 21);
`;

interface LoginFormProps {
  loginForm: { email: string; password: string };
  setLoginForm(loginForm: { email: string; password: string }): void;
}

const LoginForm = ({ loginForm, setLoginForm }: LoginFormProps) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };
  return (
    <LoginFormContainer>
      <InputBox>
        <label htmlFor='email'>이메일</label>
        <div className='input-box'>
          <input type='email' id='email' name='email' placeholder='your@email.com' onChange={onChange}></input>
          <HrTag className='hrtag' />
        </div>
        {emailValidation(loginForm.email)[0] ? null : <ValidDesc>{emailValidation(loginForm.email)[1]}</ValidDesc>}
        <hr />

        <label htmlFor='password'>비밀번호</label>
        <div className='input-box'>
          <input type='password' id='password' name='password' placeholder='영문+숫자+특수문자 최소 8자리' onChange={onChange}></input>
          <HrTag className='hrtag' />
        </div>
        {pwdValidation(loginForm.password)[0] ? null : <ValidDesc>{pwdValidation(loginForm.password)[1]}</ValidDesc>}
        <hr />
      </InputBox>
    </LoginFormContainer>
  );
};

export default LoginForm;
