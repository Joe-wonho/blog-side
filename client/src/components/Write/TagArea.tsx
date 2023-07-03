import React, { useState } from 'react';
import styled from 'styled-components';

const TagAreaContainer = styled.input``;

const TagArea = () => {
  const [selected, setSelected] = useState<string[]>(['1']);

  return <TagAreaContainer placeholder='태그를 입력하세요'></TagAreaContainer>;
};

export default TagArea;
