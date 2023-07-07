import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { tagAtom } from '../../recoil/write';

export const TagAreaContainer = styled.div`
  background-color: var(--light-gray-100);
  min-width: 432px;
  margin-bottom: 20px;
`;

export const TagBox = styled.div`
  min-width: 432px;
  min-height: 40px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  &:focus {
    border-color: tomato;
  }
`;

export const TagItem = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 6px;
  background-color: var(--active);
  border-radius: 6px;
  color: white;
  font-size: 15px;
  font-weight: 550;
  flex-shrink: 0;
`;

const Text = styled.div``;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px 4px 2px;
  font-size: 10px;
  font-weight: 900;
  margin-left: 8px;
  background-color: white;
  border-radius: 50%;
  color: tomato;
  :hover {
    transform: scale(1.05, 1.05);
  }
`;
const TagInput = styled.input`
  display: inline-flex;
  background: transparent;
  border: none;
  outline: none;
  cursor: text;
  font-weight: 500;
  font-size: 15px;
  min-width: 182px;
`;

const TagArea = () => {
  const [tagItem, setTagItem] = useState<string>('');
  // const [tagList, setTagList] = useState<string[]>([]);
  const [tagList, setTagList] = useRecoilState(tagAtom);
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    // 같은 태그가 없을때, 태그의 값이 '' 이 아닐때, 태그의 개수가 4개까지만 가능
    if (
      target.value.length !== 0 &&
      e.key === 'Enter' &&
      target.value.trim() !== '' &&
      !tagList.includes(tagItem) &&
      !tagList.includes(tagItem.trim()) &&
      tagList.length < 4
    ) {
      submitTagItem();
    }
  };

  const submitTagItem = () => {
    let updatedTagList = [...tagList];
    updatedTagList.push(tagItem.trim());
    setTagList(updatedTagList);
    setTagItem('');
  };

  const deleteTagItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    // console.dir(e.currentTarget.parentElement);
    const deleteTagItem = e.currentTarget.parentElement as Node;
    if (deleteTagItem.firstChild) {
      const dItem = deleteTagItem.firstChild.textContent;
      const filteredTagList = tagList.filter((tagItem) => tagItem !== dItem);
      setTagList(filteredTagList);
    }
  };

  return (
    <TagAreaContainer>
      <TagBox>
        {tagList.map((tagItem, index) => {
          return (
            <TagItem key={index}>
              <Text>{tagItem}</Text>
              <Button onClick={deleteTagItem}>✕</Button>
            </TagItem>
          );
        })}
        <TagInput
          type='text'
          placeholder='태그를 등록하세요. (최대 4개)'
          tabIndex={2}
          onChange={(e) => setTagItem(e.target.value)}
          value={tagItem}
          onKeyPress={onKeyPress}
        />
      </TagBox>
    </TagAreaContainer>
  );
};

export default TagArea;
