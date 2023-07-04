import React from "react";
import styled from "styled-components";
import thumbnail from "../../assets/thumbnail.png";
import { FileUpload } from "../Signup/Signup";
import { BsFillCameraFill, BsTrash3Fill } from "react-icons/bs";

const CheckContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 0;
  background-color: var(--light-gray-100);
  @media screen and (max-width: 710px) {
    min-width: 430px;
    padding: 80px 20px;
  }
`;

const ThumbnailContainer = styled.div`
  width: 100%;
  max-width: 710px;
  height: 100%;
  display: flex;
  flex-direction: column;
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
    /* justify-content: space-between; */
    align-items: center;
    gap: 22px;
    .icon-box {
      margin-left: 30px;
      display: flex;
      gap: 25px;
    }
  }

  /* @media screen and (max-width: 690px) {
    width: 100%;
  } */
`;
const Desc = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--dark-blue-800);
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
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SeriesBox = styled.div`
  width: 100%;
  height: 50px;
  border: 1px solid red;
  margin-top: 20px;
`;

const Check = () => {
  return (
    <CheckContainer>
      <ThumbnailContainer>
        <label>
          <Desc>시리즈 이미지</Desc>
          <div className="icon-box">
            <IconBox
            // onClick={(e) => {
            //   e.preventDefault();
            //   if (imgRef.current) {
            //     imgRef.current.click();
            //   }
            // }}
            >
              <BsFillCameraFill size="22" color="var(--light-gray-400)" />
            </IconBox>
            <IconBox>
              {/* <IconBox onClick={onRemoveImg}> */}
              <BsTrash3Fill size="20" color="var(--light-gray-400)" />
            </IconBox>
          </div>
        </label>
        <input type="file" placeholder="이미지업로드" accept="image/*"></input>
        {/* <input type='file' placeholder='이미지업로드' accept='image/*' ref={imgRef} onChange={onChangeImg}></input> */}

        <Preview>
          <img className="thumbnail-box" src={thumbnail} alt="thumbnail"></img>
          {/* <img src={fileURL ? fileURL : defaultProfile} alt='profile-img'></img> */}
        </Preview>
        <Desc> 시리즈 설정</Desc>
        <SeriesBox></SeriesBox>
      </ThumbnailContainer>
    </CheckContainer>
  );
};

export default Check;
