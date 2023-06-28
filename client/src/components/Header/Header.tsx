import React from 'react';
import styled from 'styled-components';
// BsSunFill
import { BsFillMoonFill } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import Dropdown from './Dropdown';
import { useRecoilValue } from 'recoil';
import { curUser } from '../../recoil/signup';
import { useNavigate } from 'react-router';
import logo from '../../assets/logo.png';
// interface HeaderProps {}

//1024 이상이면 새글작성 버튼 나오게 하기, 글씨크기 살짝작게하기
const HeaderContainer = styled.div`
  /* width: 100%; */
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
  max-width: 1320px;
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
    font-size: 18px;
    cursor: pointer;
    :hover {
      color: var(--white-100);
    }
  }
`;

const Header = () => {
  const currentUser = useRecoilValue(curUser);
  const { nickname } = currentUser;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [myProfile, setProfile] = useState(profile);
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <HeaderMenu>
        <LSide>
          <img src={logo} alt='logo'></img>
          <div onClick={() => navigate('/main')}>{`${nickname}.log`}</div>
        </LSide>
        {/* <LSide onClick={() => navigate('/main')}>{`${nickname}.log`}</LSide> */}
        <RSide>
          <div className='hover-menu'>
            <BsFillMoonFill size='22'></BsFillMoonFill>
          </div>
          <div className='hover-menu'>
            <FiSearch size='28'></FiSearch>
          </div>
          <PostBtn>새 글 작성</PostBtn>
          <Dropdown />
        </RSide>
      </HeaderMenu>
    </HeaderContainer>
  );
};

export default Header;
