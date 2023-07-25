import { useState } from 'react';
import styled from 'styled-components';
// BsSunFill
import { BsFillMoonFill } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import Dropdown from './Dropdown';
import { useRecoilValue } from 'recoil';
import { curUser } from '../../recoil/signup';
import { useLocation, useNavigate } from 'react-router';
import logo from '../../assets/logo.png';
// interface HeaderProps {}

//1024 이상이면 새글작성 버튼 나오게 하기, 글씨크기 살짝작게하기
const HeaderContainer = styled.div`
  min-width: 400px;
  height: 60px;
  display: flex;
  justify-content: center;
  background-color: var(--dark-blue-900);
  color: var(--light-gray-200);
`;
const HeaderMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1340px;

  @media screen and (min-width: 1024px) and (max-width: 1356px) {
    max-width: 1002px;
  }

  @media screen and (max-width: 1023px) {
    margin: 0 20px;
  }
`;
const LSide = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  text-shadow: 0.5px 0.5px;
  font-size: 1.3rem;
  img {
    width: 50px;
    cursor: pointer;
  }
  div {
    cursor: pointer;
  }
  @media screen and (min-width: 1024px) {
    font-size: 1.5rem;
    img {
      width: 60px;
    }
  }
`;
const RSide = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  .hover-menu {
    cursor: pointer;
    width: 46px;
    height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .hover-menu:hover {
    background-color: var(--dark-blue-700);
    border-radius: 50%;
  }
  @media screen and (max-width: 1023px) {
  }
`;

const PostBtn = styled.div`
  display: none;
  @media screen and (min-width: 1024px) {
    display: flex;
    border: 1px solid var(--light-gray-200);
    padding: 7px 12px;
    border-radius: 1rem;
    font-weight: 700;
    font-size: 16px;
    margin-top: 3px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    :hover {
      color: var(--dark-blue-900);
      background-color: var(--light-gray-200);
    }
  }
`;
const LoginBtn = styled.div`
  display: flex;
  background-color: var(--light-gray-200);
  color: var(--dark-blue-900);
  padding: 7px 12px;
  border-radius: 1rem;
  font-weight: 700;
  font-size: 16px;
  margin-top: 3px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  :hover {
    color: var(--light-gray-200);
    background-color: var(--dark-blue-700);
  }
`;

const Header = () => {
  const [isLogin, setLogin] = useState(false);
  const currentUser = useRecoilValue(curUser);

  //현재 와있는 블로그 소유자의 닉네임
  const pathName: string = decodeURI(window.location.pathname.slice(1));
  const index: number = pathName.indexOf('/');
  let blogUser: string = '';
  if (index < 0) {
    blogUser = pathName;
  } else {
    blogUser = pathName.slice(0, index);
  }
  if (pathName === 'mypage') {
    blogUser = currentUser.nickname;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [myProfile, setProfile] = useState(profile);
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <HeaderMenu>
        <LSide>
          <img src={logo} alt='logo' onClick={() => navigate('/')}></img>
          {blogUser !== '' ? <div onClick={() => navigate(`/${blogUser}`)}>{`${blogUser}.log`}</div> : null}
        </LSide>

        <RSide>
          <div className='hover-menu'>
            <BsFillMoonFill size='22'></BsFillMoonFill>
          </div>
          <div className='hover-menu'>
            <FiSearch size='28'></FiSearch>
          </div>
          {currentUser.nickname !== '' ? (
            <>
              <PostBtn
                onClick={() => {
                  navigate('/write');
                }}
              >
                새 글 작성
              </PostBtn>
              <Dropdown />
            </>
          ) : (
            <LoginBtn
              onClick={() => {
                navigate('/login');
              }}
            >
              로그인
            </LoginBtn>
          )}

          {/* <Dropdown /> */}
        </RSide>
      </HeaderMenu>
    </HeaderContainer>
  );
};

export default Header;
