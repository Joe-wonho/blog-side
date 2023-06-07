import React from 'react';
import styled from 'styled-components';
import search from '../../assets/search.svg';
import people from '../../assets/people.svg';
// interface HeaderProps {}

const HeaderContainer = styled.div`
  position: fixed;
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
  font-size: 1.5rem;
  text-shadow: 0.5px 0.5px;
`;
const RSide = styled.div`
  display: flex;
`;
const Header = () => {
  return (
    <HeaderContainer>
      <HeaderMenu>
        <LSide>MY TODO</LSide>
        <RSide>
          <img src={search} alt='search-icon'></img>
          <img src={people} alt='people-icon'></img>
        </RSide>
      </HeaderMenu>
    </HeaderContainer>
  );
};

export default Header;
