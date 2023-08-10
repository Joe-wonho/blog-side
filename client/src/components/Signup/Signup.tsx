import styled from 'styled-components';
import SignupForm from './SignupForm';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { inputsState } from '../../recoil/signup';
import { useRecoilState, useResetRecoilState } from 'recoil';
import axios from 'axios';
import { emailValidation, pwdValidation, checkPwdValidation, commonValidation } from './validation';
import { profileURItoFile } from '../Common/imgToFile';

const SignupContainer = styled.div`
  padding: 0 24px;
  height: 100%;
  @media screen and (min-width: 768px) {
    width: 494px;
    padding: 0 48px;
    height: 100%;
  }
`;
const InputBox = styled.div`
  /* height: 170px; */
  font-weight: 500;
  hr {
    border: none;
    margin: 10px 0;
  }
  @media screen and (min-width: 768px) {
    width: 395px;
  }
`;

const BtnBox = styled.div`
  margin: 60px 0 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  @media screen and (min-width: 768px) {
    width: 396px;
  }
`;
const SignupBtn = styled.button`
  border-radius: 0.5rem;
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
  /* transition: all 2s linear; 왜안되냐*/

  &:hover {
  }
`;
export interface FileUpload {
  file: FileList | null;
  setFile(file: FileList | null): void;
}
const API = `${process.env.REACT_APP_API_URL}`;

const Signup = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [form, setForm] = useRecoilState(inputsState);
  const [file, setFile] = useState<FileList | null>(null);

  const navigate = useNavigate();
  const clearSignupForm = useResetRecoilState(inputsState);

  const onClickCancle = () => {
    navigate('/login');
  };

  const onSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('email', form.email);
    formData.append('password', form.password);
    formData.append('name', form.name);
    formData.append('nickname', form.nickname);
    if (file) {
      formData.append('profile', file[0]);
    } else {
      formData.append('profile', profileURItoFile());
    }
    if (
      emailValidation(form.email)[0] === false ||
      pwdValidation(form.password)[0] === false ||
      checkPwdValidation(form.password, form.pwdCheck)[0] === false ||
      commonValidation(form.nickname)[0] === false
    ) {
      alert('올바른 정보를 입력해주세요');
    } else {
      try {
        await axios.post(`${API}/signup`, formData, {
          headers: { 'content-type': 'multipart/form-data' },
        });
        clearSignupForm();
        setFile(null);
        navigate('/login');
      } catch (err: any) {
        console.log(err);
        console.log(err.response.data.message);
        alert(err.response.data.message);
      }
    }
  };
  return (
    <SignupContainer>
      <InputBox>
        <SignupForm file={file} setFile={setFile}></SignupForm>
      </InputBox>
      <BtnBox>
        <SignupBtn onClick={onSubmit}>확인</SignupBtn>
        <SignupBtn onClick={onClickCancle}>취소</SignupBtn>
      </BtnBox>
    </SignupContainer>
  );
};

export default Signup;
