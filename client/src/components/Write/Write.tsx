import styled from "styled-components";
import Title from "./Title";
import TagArea from "./TagArea";
import Editor from "./Editor";
import { useNavigate } from "react-router";

const WriteContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const SubmitContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 30px;
  padding: 20px;
  font-weight: 600;
  .cancle-btn {
    color: var(--active);
    /* background-color: var(--light-gray-200); */
    border-radius: 8px;
    cursor: pointer;
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    :hover {
      background-color: var(--light-gray-200);
    }
  }
  .submit-btn {
    background-color: var(--blue100);
    color: white;
    border-radius: 8px;
    cursor: pointer;
    padding: 10px 20px;
    border: 1px solid blue;
    display: flex;
    justify-content: center;
    align-items: center;
    :hover {
      background-color: var(--blue200);
    }
  }
`;

const Write = () => {
  const navigate = useNavigate();
  return (
    <>
      <WriteContainer>
        <Title></Title>
        <TagArea></TagArea>
        <Editor />
      </WriteContainer>
      <SubmitContainer>
        <div className="cancle-btn">✘ 취소</div>
        <div
          className="submit-btn"
          onClick={() => {
            navigate("/check");
          }}
        >
          출간하기
        </div>
      </SubmitContainer>
    </>
  );
};

export default Write;
