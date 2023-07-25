import { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import client from '../../api/axios';
import { useNavigate } from 'react-router';

Modal.setAppElement('#root');

const Btngroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 15px;
`;
const CommonBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--light-gray-300);
  border-radius: 8px;
  padding: 4px 8px;
  font-weight: 550;
  &.delete-btn {
    background-color: rgb(255, 201, 201);
  }
`;
interface Iprops {
  postId: number;
  curUserId: number | null;
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const API = `${process.env.REACT_APP_API_URL}`;

const DeleteModal = ({ postId, curUserId, modalIsOpen, setModalIsOpen }: Iprops) => {
  const navigate = useNavigate();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(postId);
    console.log(curUserId);
    client.delete(`${API}/${postId}`, { data: { userId: curUserId } }).then((res) => {
      console.log(res.data);
      setModalIsOpen(false);
      window.location.href = '/';
    });
  };
  return (
    <>
      <Modal
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0, 0, 0.45)',
            zIndex: 10,
          },
          content: {
            background: '#F5F5F5',
            fontWeight: '600',
            overflow: 'hidden',
            width: '165px',
            height: '100px',
            top: '20%',
            left: '50%',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '10px',
            outline: 'none',
            zIndex: 10,
          },
        }}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <p>삭제하시겠습니까?</p>
        <Btngroup>
          <CommonBtn onClick={handleDelete} className='delete-btn'>
            확인
          </CommonBtn>
          <CommonBtn onClick={() => setModalIsOpen(false)}>취소</CommonBtn>
        </Btngroup>
        {/* <button onClick={() => setModalIsOpen(false)}>확인</button> */}
      </Modal>
    </>
  );
};
export default DeleteModal;
