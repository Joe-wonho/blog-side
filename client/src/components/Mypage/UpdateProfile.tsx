import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { curUser } from '../../recoil/signup';
import defaultProfile from '../../assets/profile.jpg';

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
const UpdateProfile = () => {
  const [form, setForm] = useRecoilState(curUser);

  const [file, setFile] = useState<File | null>(null);
  const [fileURL, setFileURL] = useState<string>(form.profile);

  const imgRef = useRef<HTMLInputElement>(null);

  const defaultImg = new File([defaultProfile], 'defaultProfile', { type: 'image/jpg' });

  const onChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      // const newFileURL = URL.createObjectURL(e.target.files[0]);
      // setFileURL(newFileURL);
    }
  };

  const onDeleteImg = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFile(defaultImg);
    const newFileURL = URL.createObjectURL(defaultImg);
    setFileURL(newFileURL);
  };

  return (
    <ProfileContainer>
      <ProfileImgBox>
        <img className='img-preview' src={fileURL} alt='profile'></img>
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
        <p className='my-nickname'>{form.nickname}</p>
        <p className='modify-nickname'>수정</p>
      </ProfileInfoBox>
    </ProfileContainer>
  );
};

export default UpdateProfile;
