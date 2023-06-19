import styled from 'styled-components';
// import defaultProfile from '../../assets/profile.jpg';
import { BsFillCameraFill, BsTrash3Fill } from 'react-icons/bs';
import React, { useRef, useState } from 'react';
import { FileUpload } from './Signup';
import defaultProfile from '../../assets/profile.png';
const ImgInputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  input {
    display: none;
  }
  label {
    height: 16px;
    font-size: 13px;
    line-height: 18.2px;
    color: rgb(109, 109, 109);
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    gap: 22px;
    .icon-box {
      display: flex;
      gap: 25px;
    }
  }
`;
const IconBox = styled.div`
  cursor: pointer;
  :hover {
    transform: scale(1.05, 1.05);
  }
`;

const Preview = styled.div`
  margin: 25px auto 0px;
  /* width: 60%; */
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 140px;
    height: 140px;
    object-fit: cover;
    border-radius: 50%;
  }

  @media screen and (max-width: 767px) {
    img {
      width: 165px;
      height: 165px;
    }
  }
`;

const ImgInput = ({ file, setFile }: FileUpload) => {
  const imgRef = useRef<HTMLInputElement>(null);
  const [fileURL, setFileURL] = useState<string>('');

  const onChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files);
      const newFileURL = URL.createObjectURL(e.target.files[0]);
      setFileURL(newFileURL);
    }
  };

  const onRemoveImg = (): void => {
    URL.revokeObjectURL(fileURL);
    setFileURL('');
    setFile(null);
  };

  return (
    <>
      <ImgInputContainer>
        <label>
          <p>프로필 사진</p>
          <div className='icon-box'>
            <IconBox
              onClick={(e) => {
                e.preventDefault();
                if (imgRef.current) {
                  imgRef.current.click();
                }
              }}
            >
              <BsFillCameraFill size='25' color='var(--light-gray-400)' />
            </IconBox>
            <IconBox onClick={onRemoveImg}>
              <BsTrash3Fill size='21' color='var(--light-gray-400)' />
            </IconBox>
          </div>
        </label>
        <input type='file' placeholder='이미지업로드' accept='image/*' ref={imgRef} onChange={onChangeImg}></input>
      </ImgInputContainer>

      <Preview>
        <img src={fileURL ? fileURL : defaultProfile} alt='profile-img'></img>
      </Preview>
    </>
  );
};

export default ImgInput;
