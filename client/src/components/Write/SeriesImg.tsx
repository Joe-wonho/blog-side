import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { thumbnailImgAtom } from '../../recoil/write';
import { Desc } from './SeriesArea';
import { BsFillCameraFill, BsTrash3Fill } from 'react-icons/bs';
import defaultThumbnail from '../../assets/thumbnail.png';

const SeriesImgContainer = styled.div`
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
    align-items: center;
    gap: 22px;
    .icon-box {
      margin-left: 30px;
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
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  aspect-ratio: 16/8;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const SeriesImg = () => {
  const imgRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useRecoilState(thumbnailImgAtom);
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
    <SeriesImgContainer>
      <label>
        <Desc>썸네일 이미지</Desc>
        <div className='icon-box'>
          <IconBox
            onClick={(e) => {
              e.preventDefault();
              if (imgRef.current) {
                imgRef.current.click();
              }
            }}
          >
            <BsFillCameraFill size='22' color='var(--light-gray-400)' />
          </IconBox>
          <IconBox onClick={onRemoveImg}>
            <BsTrash3Fill size='20' color='var(--light-gray-400)' />
          </IconBox>
        </div>
      </label>
      <input type='file' placeholder='이미지업로드' accept='image/*' ref={imgRef} onChange={onChangeImg}></input>
      <Preview>
        <img src={fileURL ? fileURL : defaultThumbnail} alt='profile-img'></img>
      </Preview>
    </SeriesImgContainer>
  );
};

export default SeriesImg;
