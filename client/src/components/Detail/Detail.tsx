import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { TagAreaContainer, TagItem, TagBox } from '../Write/TagArea';
import Viewer from './Viewer';
import axios from 'axios';
import client from '../../api/axios';
import { PostInterface } from '../../recoil/posts';
import { changeDate } from '../Common/changeDate';
import { useRecoilValue, useRecoilState } from 'recoil';
import { curUser } from '../../recoil/signup';
import { useNavigate } from 'react-router';
import DeleteModal from '../Common/DeleteModal';
import {
  titleAtom,
  tagAtom,
  contentAtom,
  thumbnailImgAtom,
  selectedSeriesAtom,
  thumbnailUrlAtom,
  seriesListAtom,
} from '../../recoil/write';
import { useParams } from 'react-router';
const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const PostTitle = styled.h1`
  font-size: 2rem;
  font-weight: 650;
  color: var(--dark-blue-800);
`;
const EditBtnGrop = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: end;
  gap: 10px;
`;
const CommonBtn = styled.button`
  font-size: 1rem;
  font-weight: 550;
  color: var(--light-gray-400);
`;

const WriterName = styled.div`
  font-size: 1rem;
  color: var(--dark-blue-800);
  display: flex;
  font-weight: 500;
  margin-top: 15px;
  .writer-name {
    cursor: pointer;
    font-weight: 650;
  }
  .divider {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
  }
`;

const TagSection = styled.div`
  margin: 15px 0;
`;

const SeriesSection = styled.div<{ open: boolean }>`
  background-color: var(--light-gray-200);
  height: 122px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  flex-shrink: 0;
  .series-title {
    font-size: 1.5rem;
    font-weight: 600;
  }
  .list-toggle {
    cursor: pointer;
    width: 65px;
    font-size: 0.9rem;
    font-weight: 500;
    span {
      font-size: 1.3rem;
    }
  }
  ${({ open }) =>
    open &&
    css`
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    `}
`;
const SeriesList = styled.div<{ open: boolean }>`
  display: none;
  ${({ open }) =>
    open &&
    css`
      display: flex;
    `}
  width: 100%;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--dark-blue-800);
  flex-direction: column;
  background-color: var(--light-gray-200);
  padding: 0 15px 15px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;
const SeriesUl = styled.ul`
  display: flex;
  flex-direction: column;
  /* gap: px; */
  max-height: 172px;
`;
const SeriesItem = styled.li`
  padding: 0 5px 5px;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  height: 28px;
  font-weight: 550;
  &.active {
    font-weight: 650;
    color: var(--blue100);
  }
`;

const WriterInfo = styled.div`
  border-bottom: 1px solid var(--light-gray-300);
  display: flex;
  align-items: center;
  gap: 20px;
  padding-bottom: 30px;
  .profile {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    cursor: pointer;
  }
  p {
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
  }
`;
const API = `${process.env.REACT_APP_API_URL}`;
interface SeriesListInterface {
  title: string;
  postId: number;
}
//여기서 api로 받아오자
const Detail = () => {
  const [openSeries, setSeries] = useState(false);
  const [seriesList2, setSeriesList2] = useState<SeriesListInterface[]>([]);
  const navigate = useNavigate();
  //현재 사용자면 수정 삭제 가능
  const isMe = useRecoilValue(curUser);

  //모달 관리
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // 포스트 수정관리
  const [title, setTitle] = useRecoilState(titleAtom);
  const [tag, setTag] = useRecoilState(tagAtom);
  const [content, setContent] = useRecoilState(contentAtom);
  const [thumbnailImg, setThumbnailImg] = useRecoilState(thumbnailImgAtom);
  const [selectedSeries, setSelectedSeries] = useRecoilState(selectedSeriesAtom);
  const [thumbnailUrl, setThumbnailUrl] = useRecoilState(thumbnailUrlAtom);

  //axios 로 받아온 디테일 페이지 요소
  const [data, setData] = useState<PostInterface>();
  const { postId } = useParams();
  //axios 요청 주소
  const pathName: string = decodeURI(window.location.pathname.slice(1));
  const index: number = pathName.indexOf('/');
  //현재 페이지의 닉네임과 현재 로그인한 유저를 비교하기 위한 변수 가져오기
  const curPageNickname: string = pathName.slice(0, index);
  useEffect(() => {
    axios.get(`${API}/${pathName}`).then((res) => {
      setData(res.data);
      // 시리즈 가져오기
      axios
        .get(`${API}/${res.data.nickname}/series/${decodeURIComponent(res.data.series)}?page=1&size=16`)
        .then((res) => {
          const changeList2: SeriesListInterface[] = [];
          res.data.post.map((el: PostInterface) => {
            changeList2.push({ title: el.title, postId: el.postId });
          });
          setSeriesList2(changeList2);
        });
    });
  }, [postId]);

  const handleGoBlog = () => {
    if (data) {
      navigate(`/${data.nickname}`);
    }
  };

  const deletePosting = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setModalIsOpen(true);
  };

  const editPosting = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (data) {
      setTitle(data.title);
      setContent(data.content);
      //섬네일 이미지처리
      if (data.thumbnail !== '' && data.thumbnail) {
        setThumbnailUrl(decodeURI(data.thumbnail));
        const fileName = decodeURI(data.thumbnail).split('/').pop();
        const ext = fileName?.split('.')[1];
        const metadata = { type: `image/${ext}` };
        console.log(fileName);
        console.log(ext);
        const response = await fetch(`${decodeURI(data.thumbnail)}`);
        const blob = await response.blob();
        // console.log(blob);
        const urlToFile = new File([blob], fileName!, metadata);
        if (urlToFile) {
          setThumbnailImg(urlToFile);
        }
      }
      if (data.tag) {
        setTag(data.tag);
      }
      if (data.series) {
        setSelectedSeries(data.series);
      }
    } else {
      alert('수정할 데이터가 없습니다');
      return;
    }
    navigate(`/write/${postId}`);
  };
  return (
    <DetailContainer>
      {data && (
        <>
          <PostTitle> {data.title}</PostTitle>
          <EditBtnGrop>
            {isMe.nickname === curPageNickname ? (
              <>
                <CommonBtn onClick={editPosting}>수정</CommonBtn>
                <CommonBtn onClick={deletePosting}>삭제</CommonBtn>
              </>
            ) : null}
          </EditBtnGrop>

          <WriterName>
            <p className='writer-name'>{data.nickname}</p>
            <div className='divider'>•</div>
            <p>{changeDate(data.createdAt)}</p>
          </WriterName>
          <TagSection>
            {data.tag.length === 0 ? null : (
              <TagBox>
                {data.tag.map((tagItem, index) => {
                  return (
                    <TagItem key={index}>
                      <div>{tagItem}</div>
                    </TagItem>
                  );
                })}
              </TagBox>
            )}
          </TagSection>
          {data.series && (
            <>
              <SeriesSection open={openSeries}>
                <div className='series-title'>{data.series}</div>
                <div
                  onClick={() => {
                    setSeries(!openSeries);
                  }}
                  className='list-toggle'
                >
                  <span>▾</span> 목록보기
                </div>
              </SeriesSection>
              <SeriesList open={openSeries}>
                <SeriesUl>
                  {seriesList2 &&
                    seriesList2.map((el, idx) => {
                      return (
                        <SeriesItem
                          onClick={() => {
                            navigate(`/${data.nickname}/${el.postId}`);
                          }}
                          className={el.title === data.title ? 'active' : ''}
                          key={idx}
                          // onClick={handleClickSelectSerires}
                        >
                          {idx + 1}.&nbsp;{el.title}
                        </SeriesItem>
                      );
                    })}
                </SeriesUl>
              </SeriesList>
            </>
          )}

          <Viewer content={data.content}></Viewer>
          <WriterInfo>
            <img onClick={handleGoBlog} src={data.profile} alt='profile' className='profile'></img>
            <p onClick={handleGoBlog}>{data.nickname}</p>
          </WriterInfo>
        </>
      )}
      {data && (
        <DeleteModal
          postId={data.postId}
          curUserId={isMe.userId}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
      )}
    </DetailContainer>
  );
};

export default Detail;
