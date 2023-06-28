import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
const TagContainer = styled.div`
  position: absolute;
  display: flex;

  .title {
    display: none;
  }
  @media screen and (min-width: 768px) and (max-width: 1169px) {
    top: -3rem;
    width: 768px;
  }
  @media screen and (min-width: 1170px) {
    width: 11.5rem;
    left: -12rem;
    display: block;
    width: 10rem;
    display: flex;
    flex-direction: column;
    .title {
      display: block;
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      border-bottom: 2px solid var(--light-gray-300);
      color: var(--dark-blue-800);
      padding-bottom: 4px;
    }
  }
`;
const TagList = styled.ul`
  display: flex;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;

  @media screen and (min-width: 768px) and (max-width: 1169px) {
    gap: 14px;
    width: 682px;
    margin: 0 auto;
    overflow: hidden;
    scroll-behavior: smooth;
  }

  @media screen and (min-width: 1170px) {
    gap: 8px;
    flex-direction: column;
    margin-top: 8px;
    height: auto;
  }
`;
const TagLi = styled.li`
  background-color: rgba(82, 95, 255, 0.8);
  padding: 4px 9px;
  border-radius: 10px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 768px) and (max-width: 1169px) {
    flex-shrink: 0;
    height: 29px;
  }

  @media screen and (min-width: 1170px) {
    background-color: transparent;
    color: var(--dark-blue-800);
    padding: 0;
    display: block;
  }
`;

const PrevBtn = styled.button`
  @media screen and (min-width: 1170px) {
    display: none;
  }
`;
const NextBtn = styled.button`
  /* position: absolute; */
  @media screen and (min-width: 1170px) {
    display: none;
  }
`;

const test: string[] = [
  '전체보기',
  '1123번 태그',
  '2번 태그',
  '3번 태그',
  '전체보기',
  '1123번 태그',
  '2번 태그',
  '3번 태그',
  '55555555',
  '1123번 태그',
  '2번 태그',
  '3번 태그',
  '888888',
  '1123번 태그',
  '2번 태그',
  '3번 태그',
];

const Tag = () => {
  //원래 overflow 되기 전 ul의 길이
  const [width, setWidth] = useState(0); // 1077 그떄그때 변함
  const tagRef = useRef<HTMLUListElement>(null);
  let viewWidth = useRef<number>(0);
  useEffect(() => {
    if (tagRef.current) {
      setWidth(tagRef.current.scrollWidth);
    }
  }, [width]);
  //682는 화면 길이  1077은 원래 길이   // 1077-682 = 395남음
  const prevClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (tagRef.current) {
      if (viewWidth.current - 682 >= 0) {
        viewWidth.current -= 682;
        tagRef.current.scrollLeft -= 682;
      }
    }
  };
  const nextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (tagRef.current) {
      // console.log('수행전');
      // console.log(viewWidth);
      if (viewWidth.current + 682 < width) {
        viewWidth.current += 682;
        tagRef.current.scrollLeft += 682;
        // console.log('수행후');
        // console.log(viewWidth);
      }
    }
  };

  return (
    <TagContainer className='top'>
      <div className='title'>태그 목록</div>
      <PrevBtn onClick={prevClick}>
        <GrFormPrevious size='28' color='red' className='common-btn' />
      </PrevBtn>

      <TagList ref={tagRef} className='middle'>
        {test.length === 0 ? (
          <TagLi className='bottom'>전체보기</TagLi>
        ) : (
          test.map((el, idx) => {
            return <TagLi key={idx}>{el}</TagLi>;
          })
        )}
      </TagList>
      <NextBtn onClick={nextClick}>
        <GrFormNext size='28' className='common-btn' />
      </NextBtn>
    </TagContainer>
  );
};

export default Tag;
