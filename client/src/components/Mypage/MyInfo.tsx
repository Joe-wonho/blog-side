import styled from 'styled-components';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { curUser, accessToken } from '../../recoil/signup';
import UpdateProfile from './UpdateProfile';
import axios from '../../api/axios';
import { useNavigate } from 'react-router';
const MyinfoContainer = styled.div`
  width: 100%;
  padding: 20px;
`;

const InfoContainer = styled.div`
  width: 100%;
  margin: 25px 0;
  border-bottom: 1px solid var(--gray-blue-300);
  display: flex;
  flex-direction: column;
  .info-desc {
    color: var(--gray-600);
    font-size: 0.9rem;
    margin: 5px 0 15px;
  }
`;
const InfoDiv = styled.div`
  display: flex;
  height: 25px;
  align-items: center;
  color: var(--dark-blue-800);
  margin-bottom: 9px;
  .title {
    font-size: 1.2rem;
    font-weight: 600;
    width: 140px;
  }
  .title-desc {
    font-size: 1.1rem;
    font-weight: 400;
    flex-grow: 1;
  }
  .title-modify {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 30px;
    font-size: 0.9rem;
    font-weight: 400;
    text-decoration: underline;
  }
`;
const DeleteBtn = styled.button`
  background-color: rgb(255, 201, 201);
  font-size: 0.95rem;
  font-weight: 450;
  padding: 7px 16px;
  border-radius: 8px;
  transition-property: background-color;
  transition-duration: 0.3s;
  :hover {
    background-color: rgb(248, 166, 166);
  }
`;

const MyInfo = () => {
  const currentUser = useRecoilValue(curUser);
  const token = useRecoilValue(accessToken);
  const { userId, email, nickname } = currentUser;

  const navigate = useNavigate();

  const clearCurUser = useResetRecoilState(curUser);
  const clearToken = useResetRecoilState(accessToken);

  const onClickDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:8080/user/${userId}`, {
        headers: { Authorization: token },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        alert('삭제완료');
        clearCurUser();
        clearToken();
        navigate('/login');
      });
  };

  const handleModify = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // e.preventDefault();
    // await client.patch(`/user/${userId}`);
  };

  return (
    <MyinfoContainer>
      <UpdateProfile></UpdateProfile>
      <InfoContainer>
        <InfoDiv>
          <div className='title'>제목</div>
          <div className='title-desc'>{`${nickname}.log 여기 수정버튼 작동 아직 안됨 API 없음`}</div>
          <button onClick={handleModify} className='title-modify'>
            수정
          </button>
        </InfoDiv>
        <p className='info-desc'>개인 페이지의 좌측 상단에 나타나는 페이지 제목입니다.</p>
      </InfoContainer>

      <InfoContainer>
        <InfoDiv>
          <div className='title'>이메일 주소</div>
          <div className='title-desc'>{email}</div>
        </InfoDiv>
        <p className='info-desc'>회원 인증 또는 시스템에서 발송하는 이메일을 수신하는 주소입니다.</p>
      </InfoContainer>

      <InfoContainer>
        <InfoDiv>
          <div className='title'>회원탈퇴</div>
          <DeleteBtn onClick={onClickDelete}>회원 탈퇴</DeleteBtn>
        </InfoDiv>
        <p className='info-desc'>탈퇴 시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다.</p>
      </InfoContainer>
    </MyinfoContainer>
  );
};

export default MyInfo;
