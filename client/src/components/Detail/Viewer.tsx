import React from 'react';
import styled from 'styled-components';
import DOMPurify from 'dompurify';
const ViewerContainer = styled.div`
  margin: 40px 0 80px;
  width: 100%;
  min-height: 230px;
  white-space: normal;
  word-break: break-all;
  line-height: 20px;
`;

interface ViewerProps {
  content: string;
}

const Viewer = ({ content }: ViewerProps) => {
  const sanitizer = DOMPurify.sanitize;
  return (
    <ViewerContainer>
      <div dangerouslySetInnerHTML={{ __html: sanitizer(content) }} />
    </ViewerContainer>
  );
};

export default Viewer;
