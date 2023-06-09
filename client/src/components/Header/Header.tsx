import React from 'react';
import styled from 'styled-components';
// BsSunFill
import { BsFillMoonFill } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import Dropdown from './Dropdown';
// interface HeaderProps {}

//1024 이상이면 새글작성 버튼 나오게 하기, 글씨크기 살짝작게하기
const HeaderContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  background-color: var(--dark-blue-900);
  color: var(--light-gray-200);
`;
const HeaderMenu = styled.div`
  width: 100%;
  max-width: 1320px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LSide = styled.div`
  text-shadow: 0.5px 0.5px;
  font-size: 1.3rem;
  @media screen and (min-width: 1024px) {
    font-size: 1.5rem;
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
    padding: 10px 12px;
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
  return (
    <HeaderContainer>
      <HeaderMenu>
        <LSide>MY TODO</LSide>
        <RSide>
          <div className='hover-menu'>
            <BsFillMoonFill size='26'></BsFillMoonFill>
          </div>
          <div className='hover-menu'>
            <FiSearch size='30'></FiSearch>
          </div>
          <PostBtn>새 글 작성</PostBtn>
          <Dropdown></Dropdown>
        </RSide>
      </HeaderMenu>
    </HeaderContainer>
  );
};

export default Header;
