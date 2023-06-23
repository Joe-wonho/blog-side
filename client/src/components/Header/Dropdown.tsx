import styled, { css } from 'styled-components';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { curUser } from '../../recoil/signup';
import client from '../../api/axios';
const DropdownContainer = styled.div``;
const DropdownToggle = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  .people-icon {
    background-color: var(--gray-600);
    border-radius: 50%;
    width: 45px;
    height: 45px;
  }
`;

const DropdownMenu = styled.ul<{ dropdown: boolean }>`
  /* ${({ dropdown }) =>
    dropdown &&
    css`
      color: #ced4da;
    `} */
  display: ${({ dropdown }) => (dropdown ? 'flex' : 'none')};
  position: absolute;
  flex-direction: column;
  justify-content: space-around;
  top: 105%;
  right: 0;
  width: 185px;
  height: 140px;
  background-color: var(--dark-blue-900);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const DropdownItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  color: var(--light-gray-200);
  :hover {
    color: var(--white-100);
    transform: scale(1.02, 1.02);
  }
`;

const Dropdown = () => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentUser = useRecoilValue(curUser);
  const clearCurUser = useResetRecoilState(curUser);

  const navigate = useNavigate();

  const handleClick = () => {
    setDropdown(!dropdown);
  };

  useEffect(() => {
    const outsideClick = (e: MouseEvent) => {
      //!searchRef.current.contains(e.target as Node) 은 SearchResult태그에 이벤트가 발생하지 않았을때를 의미
      if (dropdown === true && dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdown(false); //외부 클릭시 실행할 로직
      }
    };
    document.addEventListener('mousedown', outsideClick); //컴포넌트 렌더링 후 이벤트 등록
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', outsideClick); //컴포넌트가 제거될때 실행
    };
  }, [dropdown]);

  const onClickLogout = async (e: React.MouseEvent<HTMLLIElement>) => {
    client.post(`/signout`).then((res) => {
      clearCurUser();
      window.localStorage.removeItem('accessToken');
      navigate('/login');
    });
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownToggle onClick={handleClick}>
        <img src={currentUser.profile} alt='profile-icon' className='people-icon'></img>
        <IoMdArrowDropdown className='down-icon' size='24' color='var(--light-gray-200)'></IoMdArrowDropdown>
      </DropdownToggle>
      <DropdownMenu dropdown={dropdown}>
        <DropdownItem onClick={() => navigate('/main')}>내 블로그</DropdownItem>
        <DropdownItem onClick={() => navigate('/mypage')}>나의 정보</DropdownItem>
        <DropdownItem onClick={onClickLogout}>로그아웃</DropdownItem>
      </DropdownMenu>
    </DropdownContainer>
  );
};

export default Dropdown;
