import styled from 'styled-components';
import SignupForm from './SignupForm';

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
const Signup = () => {
  return (
    <SignupContainer>
      <InputBox>
        <SignupForm></SignupForm>
      </InputBox>
      <BtnBox>
        <SignupBtn>확인</SignupBtn>
        <SignupBtn>취소</SignupBtn>
      </BtnBox>
    </SignupContainer>
  );
};

export default Signup;
