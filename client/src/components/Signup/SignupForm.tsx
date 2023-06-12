import styled from 'styled-components';
import ImgInput from './ImgInput';
import { inputsState } from '../../recoil/signup';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { FileUpload } from './Signup';

const SignupFormContainer = styled.form`
  hr {
    border: none;
    margin: 10px 0;
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
    > input {
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
const EmailCheck = styled.div`
  font-size: 11px;
  width: 52px;
  height: 25px;
  font-weight: 500;
  color: var(--gray-850);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  cursor: pointer;
  border: 1px solid var(--light-gray-400);
  border-radius: 0.5rem;
  padding: 2px 5px;
  :hover {
    font-weight: 600;
  }
`;

const SignupForm = ({ file, setFile }: FileUpload) => {
  const [form, setForm] = useRecoilState(inputsState);

  const [pwdCheck, setPwdCheck] = useState<string>('');

  const { name, nickname, email, password } = form;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onChangePwdCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwdCheck(e.target.value);
  };
  return (
    <SignupFormContainer>
      <label htmlFor='email'>이메일</label>
      <div className='input-box'>
        <input type='email' id='email' name='email' value={email} onChange={onChange} placeholder='your@email.com'></input>
        <HrTag className='hrtag' />
        <EmailCheck>중복확인</EmailCheck>
      </div>
      <hr />

      <label htmlFor='password'>비밀번호</label>
      <div className='input-box'>
        <input type='password' id='password' name='password' value={password} onChange={onChange} placeholder='영문+숫자+특수문자 최소 8자리'></input>
        <HrTag className='hrtag' />
      </div>
      <hr />

      <label htmlFor='password-check'>비밀번호 확인</label>
      <div className='input-box'>
        <input
          type='password'
          id='password-check'
          name='passwordCheck'
          placeholder='비밀번호 확인'
          value={pwdCheck}
          onChange={onChangePwdCheck}
        ></input>
        <HrTag className='hrtag' />
      </div>
      <hr />

      <label htmlFor='name'>이름</label>
      <div className='input-box'>
        <input type='text' id='name' name='name' value={name} onChange={onChange} placeholder='이름'></input>
        <HrTag className='hrtag' />
      </div>
      <hr />

      <label htmlFor='nickname'>닉네임</label>
      <div className='input-box'>
        <input type='text' id='nickname' name='nickname' value={nickname} onChange={onChange} placeholder='닉네임'></input>
        <HrTag className='hrtag' />
      </div>
      <hr />

      <ImgInput file={file} setFile={setFile}></ImgInput>
    </SignupFormContainer>
  );
};

export default SignupForm;