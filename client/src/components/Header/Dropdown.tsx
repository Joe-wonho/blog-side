import styled from 'styled-components';
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
  display: ${({ dropdown }) => (dropdown ? 'flex' : 'none')};
  position: absolute;
  flex-direction: column;
  justify-content: space-around;
  top: 105%;
  right: 0;
  width: 170px;
  height: 150px;
  background-color: var(--dark-blue-900);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  z-index: 10;
  @media screen and (max-width: 1023px) {
    right: -20px;
    height: 190px;
  }
`;

const DropdownItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  color: var(--light-gray-200);
  cursor: pointer;
  :hover {
    color: var(--white-100);
    transform: scale(1.02, 1.02);
  }
  @media screen and (min-width: 1024px) {
    &.post-btn {
      display: none;
    }
  }
`;

const Dropdown = () => {
  // 드롭다운이 열려 있는지 닫혀 있는지 확인하는 상태
  const [dropdown, setDropdown] = useState<boolean>(false);
  // useRef를 이용해서 드롭다운 DOM 에 접근
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentUser = useRecoilValue(curUser);
  const clearCurUser = useResetRecoilState(curUser);

  const navigate = useNavigate();

  //드롭다운 상태 변경
  const handleClick = () => {
    setDropdown(!dropdown);
  };
  useEffect(() => {
    // 드롭다운의 외부를 클릭했을 때 발생할 함수 작성
    const outsideClick = (e: MouseEvent) => {
      //!dropdownRef.current.contains(e.target as Node)
      //DropdownContainer 태그 영역에 이벤트가 발생하지 않았을때를 의미
      if (dropdown === true && dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdown(false); //외부 클릭시 실행할 로직 (드롭다운의 상태 변경)
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
    <DropdownContainer className='top-div' ref={dropdownRef}>
      <DropdownToggle onClick={handleClick}>
        <img src={currentUser.profile} alt='profile-icon' className='people-icon'></img>
        <IoMdArrowDropdown className='down-icon' size='24' color='var(--light-gray-200)'></IoMdArrowDropdown>
      </DropdownToggle>
      <DropdownMenu dropdown={dropdown}>
        <DropdownItem onClick={() => navigate(`/${currentUser.nickname}`)}>내 블로그</DropdownItem>
        <DropdownItem onClick={() => navigate('/mypage')}>나의 정보</DropdownItem>
        <DropdownItem className='post-btn' onClick={() => navigate('/write')}>
          새 글 작성
        </DropdownItem>
        <DropdownItem onClick={onClickLogout}>로그아웃</DropdownItem>
      </DropdownMenu>
    </DropdownContainer>
  );
};

export default Dropdown;
