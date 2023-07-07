import React from 'react';
import styled from 'styled-components';
import DOMPurify from 'dompurify';
const ViewerContainer = styled.div`
  margin: 40px 0 80px;
  width: 100%;
`;
const testM = `<p>111asd</p><p><span class="ql-size-24">asdasdasdasd</span></p><p><u class="ql-size-24">asd</u></p><p><img src="https://blog-side.s3.ap-northeast-2.amazonaws.com/%E1%84%90%E1%85%A6%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3%208.jpeg"></p><p>asd<span class="ql-size-24">asdasd</span><span class="ql-size-18">asdasd</span></p>`;

const Viewer = () => {
  const sanitizer = DOMPurify.sanitize;
  return (
    <ViewerContainer>
      <div dangerouslySetInnerHTML={{ __html: sanitizer(testM) }} />
    </ViewerContainer>
  );
};

export default Viewer;
