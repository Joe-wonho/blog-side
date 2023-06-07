import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  border: 1px solid gray;
  /* background-color: gray; */
`;
const FooterContent = styled.div`
  width: 100%;
  max-width: 1320px;
`;

const Footer = () => {
  return (
    <>
      <FooterContainer>
        <FooterContent>푸터 내용 들어가는곳</FooterContent>
      </FooterContainer>
    </>
  );
};

export default Footer;
