import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { TagInterface } from './Posts';
const TagContainer = styled.div`
  position: absolute;
  display: flex;

  .title {
    display: none;
  }
  @media screen and (max-width: 767px) {
    top: -3.8rem;
    width: 100%;
  }
  @media screen and (min-width: 768px) and (max-width: 1169px) {
    top: -3rem;
    width: 768px;
    min-width: 400px;
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

  @media screen and (max-width: 767px) {
    gap: 12px;
    scroll-behavior: smooth;
    overflow-x: auto;
    height: 47px;
    width: 100%;
    ::-webkit-scrollbar {
      height: 8px; //스크롤바의 너비
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(82, 95, 255, 0.5); // 스크롤바의 색상
      border-radius: 10px;
    }
    ::-webkit-scrollbar-track {
      background: rgba(33, 122, 244, 0.1); /*스크롤바 뒷 배경 색상*/
    }
  }

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
  cursor: pointer;
  flex-shrink: 0;
  height: 29px;
  p {
    transition: transform 0.4s ease-in-out;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    span {
      font-size: 12px;
      margin-left: 5px;
    }
    &.active {
      font-weight: 700;
      transform: scale(1.1, 1.1);
      span {
        transform: scale(1.1, 1.1);
      }
    }
  }
  :hover {
    color: var(--active);
  }

  @media screen and (max-width: 767px) {
    height: 26px;
    padding: 3px 8px 5px 7px;
  }

  @media screen and (min-width: 1170px) {
    background-color: transparent;
    color: var(--dark-blue-800);
    padding: 0;
    display: block;
    p {
      display: inline-block;
      &.active {
        transform: translateX(20%);
        justify-content: center;
        border-radius: 4px;
        font-weight: 700;
        background-color: rgba(82, 95, 255, 0.8);
        color: white;
        padding: 2px 4px;
      }
    }
  }
`;

const PrevBtn = styled.button`
  display: none;
  @media screen and (min-width: 768px) and (max-width: 1169px) {
    display: block;
  }
`;
const NextBtn = styled.button`
  display: none;
  @media screen and (min-width: 768px) and (max-width: 1169px) {
    display: block;
  }
`;

export interface TagProps {
  tag: TagInterface[];
  selectedTag: string;
  setSelectedTag: React.Dispatch<React.SetStateAction<string>>;
}

const Tag = ({ tag, selectedTag, setSelectedTag }: TagProps) => {
  //원래 overflow 되기 전 ul의 길이
  const [width, setWidth] = useState(0); // 1077 그떄그때 변함
  const tagRef = useRef<HTMLUListElement>(null);
  let viewWidth = useRef<number>(0);
  useEffect(() => {
    if (tagRef.current) {
      setWidth(tagRef.current.scrollWidth);
    }
  }, [width]);
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
        {tag.length === 0 ? (
          <TagLi
            onClick={() => {
              setSelectedTag('');
            }}
          >
            <p className={selectedTag === '' ? 'active' : ''}>전체보기</p>
          </TagLi>
        ) : (
          <>
            <TagLi
              onClick={() => {
                setSelectedTag('');
              }}
            >
              <p className={selectedTag === '' ? 'active' : ''}>전체보기</p>
            </TagLi>
            {tag.map((el, idx) => {
              return (
                <TagLi
                  onClick={() => {
                    setSelectedTag(el.tagName);
                  }}
                  key={idx}
                >
                  <p className={selectedTag === el.tagName ? 'active' : ''}>
                    {el.tagName}
                    <span>({el.count})</span>
                  </p>
                </TagLi>
              );
            })}
          </>
        )}
      </TagList>
      <NextBtn onClick={nextClick}>
        <GrFormNext size='28' className='common-btn' />
      </NextBtn>
    </TagContainer>
  );
};

export default Tag;
