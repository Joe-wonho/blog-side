import React from 'react';
import styled from 'styled-components';
import { BsFillMoonFill, BsSunFill } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import { IoMdArrowDropdown } from 'react-icons/io';
import profile from '../../assets/profile.png';
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
  margin-left: 15px;
  @media screen and (min-width: 1024px) {
    font-size: 1.5rem;
    margin-left: 0;
  }
`;
const RSide = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  @media screen and (max-width: 1023px) {
    margin-right: 15px;
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
  }
`;

const PeopleIcon = styled.div`
  display: flex;
  align-items: center;
  .people-icon {
    background-color: var(--gray-600);
    border-radius: 50%;
    width: 45px;
    height: 45px;
  }
`;
const Header = () => {
  return (
    <HeaderContainer>
      <HeaderMenu>
        <LSide>MY TODO</LSide>
        <RSide>
          <BsFillMoonFill size='25'></BsFillMoonFill>
          <FiSearch size='30'></FiSearch>
          <PostBtn>새 글 작성</PostBtn>
          <PeopleIcon>
            <img src={profile} alt='profile-icon' className='people-icon'></img>
            <IoMdArrowDropdown className='down-icon' size='24'></IoMdArrowDropdown>
          </PeopleIcon>
        </RSide>
      </HeaderMenu>
    </HeaderContainer>
  );
};

export default Header;
