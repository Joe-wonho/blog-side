import React, { useState, useRef } from 'react';
import styled from 'styled-components';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useRecoilState, useRecoilValue } from 'recoil';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { curUser, accessToken } from '../../recoil/signup';
// import axios from 'axios';
import client from '../../api/axios';
import { dataURItoFile } from '../Common/imgToFile';

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
  input {
    display: none;
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
    width: 33px;
    text-decoration: underline;
  }
  .modify-input {
    font-size: 1.5rem;
    border: 1px solid var(--gray-blue-300);
    border-radius: 10px;
    padding: 5px 10px;
    width: 50%;
  }
  .modify-btn {
    transform: translate(235px, 10px);
    width: 50px;
    padding: 5px 10px;
    font-size: 1rem;
    border: 1px solid var(--gray-blue-300);
    border-radius: 10px;
    box-shadow: 1px 1px var(--gray-blue-300);
    cursor: pointer;
    background-color: var(--light-gray-100);
    transition-property: background-color;
    transition-duration: 0.3s;
    :hover {
      background-color: var(--light-gray-200);
    }
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
    .modify-input {
      font-size: 1.2rem;
      border: 1px solid var(--gray-blue-300);
      border-radius: 10px;
      padding: 5px 10px;
      width: 50%;
    }
    .modify-btn {
      transform: translate(20px);
    }
  }
`;
const UpdateProfile = () => {
  // const token = useRecoilValue(accessToken);
  const [form, setForm] = useRecoilState(curUser);
  const [nickname, setNickname] = useState(form.nickname);
  const [modifyState, setModifyState] = useState(false);
  const imgRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState(form.profile);

  const onChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (e.target.files) {
      formData.append('profile', e.target.files[0]);
    }
    client
      .patch(`/user/${form.userId}`, formData, {
        headers: { 'content-type': 'multipart/form-data' },
      })
      .then((res) => {
        setForm({ ...form, profile: res.data.profile });
        setProfile(res.data.profile);
      });
  };

  const onDeleteImg = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // setFile();
    const formData = new FormData();
    formData.append('profile', dataURItoFile());

    client
      .patch(`/user/${form.userId}`, formData, {
        headers: { 'content-type': 'multipart/form-data' },
      })
      .then((res) => {
        setForm({ ...form, profile: res.data.profile });
        setProfile(res.data.profile);
      });
  };

  const onModifyNickname = () => {
    const formData = new FormData();
    formData.append('nickname', nickname);
    client
      .patch(`/user/${form.userId}`, formData, {
        headers: { 'content-type': 'multipart/form-data' },
      })
      .then((res) => {
        setForm({ ...form, nickname: res.data.nickname });
        setModifyState(false);
      });
  };

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  return (
    <ProfileContainer>
      <ProfileImgBox>
        <img className='img-preview' src={profile} alt='profile'></img>
        <ImgBtn
          onClick={(e) => {
            e.preventDefault();
            if (imgRef.current) {
              imgRef.current.click();
            }
          }}
          className='img-upload'
        >
          이미지 업로드
        </ImgBtn>
        <ImgBtn onClick={onDeleteImg} className='img-delete'>
          이미지 제거
        </ImgBtn>
        <input type='file' placeholder='이미지업로드' accept='image/*' ref={imgRef} onChange={onChangeImg}></input>
      </ProfileImgBox>
      <ProfileInfoBox>
        {modifyState ? (
          <>
            <input onChange={onChangeNickname} className='modify-input' value={nickname}></input>
            <p onClick={onModifyNickname} className='modify-btn'>
              저장
            </p>
          </>
        ) : (
          <>
            <p className='my-nickname'>{nickname}</p>
            <p
              onClick={() => {
                setModifyState(true);
              }}
              className='modify-nickname'
            >
              수정
            </p>
          </>
        )}
      </ProfileInfoBox>
    </ProfileContainer>
  );
};

export default UpdateProfile;
