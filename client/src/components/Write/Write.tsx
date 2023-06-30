import styled from 'styled-components';

const WriteContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Title = styled.textarea`
  width: 100%;
  min-height: 60px;
  border: 1px solid red;
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  overflow: hidden;
  text-decoration: none;
  :focus {
    text-decoration: none;
  }
`;

const Write = () => {
  return (
    <WriteContainer>
      <Title placeholder='제목을 입력하세요'></Title>
    </WriteContainer>
  );
};

export default Write;
