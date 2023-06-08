import styled from 'styled-components';
import profile from '../../assets/profile.jpg';
import { BsFillCameraFill, BsTrash3Fill } from 'react-icons/bs';

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
    justify-content: end;
    align-items: center;
    gap: 22px;
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
  }

  @media screen and (max-width: 767px) {
    img {
      width: 165px;
      height: 165px;
    }
  }
`;

const ImgInput = () => {
  return (
    <>
      <ImgInputContainer>
        <label>
          <IconBox>
            <BsFillCameraFill size='24' color='var(--light-gray-400)' />
          </IconBox>
          <IconBox>
            <BsTrash3Fill size='21' color='var(--light-gray-400)' />
          </IconBox>
        </label>
        <input type='file' placeholder='이미지업로드' accept='image/*'></input>
      </ImgInputContainer>

      <Preview>
        <img src={profile} alt='profile-img'></img>
      </Preview>
    </>
  );
};

export default ImgInput;
