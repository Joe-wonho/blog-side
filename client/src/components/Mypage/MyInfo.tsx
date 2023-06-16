import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { curUser } from '../../recoil/signup';
const MyinfoContainer = styled.div`
  width: 100%;
  padding: 20px;
`;

const ProfileContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 70px;
  flex-direction: row;
  @media screen and (max-width: 804px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    min-width: 410px;
  }
`;

const ProfileImgBox = styled.div`
  width: 152px;
  height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  .img-preview {
    border-radius: 50%;
    width: 128px;
    height: 128px;
  }
  @media screen and (max-width: 804px) {
    width: 100%;
  }
`;

const ImgBtn = styled.button`
  font-size: 0.95rem;
  width: 128px;
  height: 32px;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition-property: background-color;
  transition-duration: 0.3s;
  &.img-upload {
    background-color: var(--light-gray-200);
    :hover {
      background-color: var(--light-gray-350);
    }
  }
  &.img-delete {
    background-color: rgb(255, 201, 201);
    :hover {
      background-color: rgb(248, 166, 166);
    }
  }
  @media screen and (max-width: 804px) {
    width: 160px;
  }
`;
const ProfileInfoBox = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding-left: 24px;
  padding-top: 5px;
  gap: 10px;

  .my-nickname {
    font-size: 1.5rem;
    cursor: default;
  }
  .modify-nickname {
    font-size: 1.1rem;
    cursor: pointer;
    text-decoration: underline;
  }
  @media screen and (max-width: 804px) {
    border-bottom: 1px solid var(--gray-blue-300);
    border-top: 1px solid var(--gray-blue-300);
    margin-top: 30px;
    width: 100%;
    height: 85px;
    padding: 10px 0;
    gap: 0;
    flex-direction: row;
    align-items: center;
    .my-nickname {
      font-size: 1.2rem;
      font-weight: 500;
      width: 140px;
      cursor: default;
    }
    .modify-nickname {
      font-size: 0.9rem;
      cursor: pointer;
      text-decoration: underline;
    }
  }
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
  const { userId, email, nickname, profile } = currentUser;
  return (
    <MyinfoContainer>
      <ProfileContainer>
        <ProfileImgBox>
          <img className='img-preview' src={profile} alt='profile'></img>
          <ImgBtn className='img-upload'>이미지 업로드</ImgBtn>
          <ImgBtn className='img-delete'>이미지 제거</ImgBtn>
        </ProfileImgBox>
        <ProfileInfoBox>
          <p className='my-nickname'>{nickname}</p>
          <p className='modify-nickname'>수정</p>
        </ProfileInfoBox>
      </ProfileContainer>
      <InfoContainer>
        <InfoDiv>
          <div className='title'>제목</div>
          <div className='title-desc'>{`${nickname}.log`}</div>
          <button className='title-modify'>수정</button>
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
          <DeleteBtn>회원 탈퇴</DeleteBtn>
        </InfoDiv>
        <p className='info-desc'>탈퇴 시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다.</p>
      </InfoContainer>
    </MyinfoContainer>
  );
};

export default MyInfo;
