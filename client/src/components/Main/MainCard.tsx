import styled from 'styled-components';
import { ServerData } from './MainList';
import { changeDate } from '../Common/changeDate';
import Dompurify from 'dompurify';
import { useNavigate } from 'react-router';

const MainCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  height: auto;
  /* background-color: var(--gray-blue-200); */
  background-color: var(--light-gray-200);
  box-shadow: inset 1px 1px 0px 0px rgba(170, 200, 167, 0.5), 1px 1px 2px 0px rgba(0, 0, 0, 0.1),
    4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  @media screen and (min-width: 1024px) {
    transition: transform 0.3s ease-in-out;
    :hover {
      transform: translateY(-10px);
    }
  }

  @media screen and (min-width: 662px) and (max-width: 1023px) {
    width: 48%;
  }
  @media screen and (max-width: 661px) {
    width: 100%;
  }
`;

const Thumbnail = styled.div`
  /* margin-bottom: 3px; */
  .thumbnail-img {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    cursor: pointer;
  }
  @media screen and (min-width: 1024px) {
    .thumbnail-img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
  }
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

const Title = styled.h4`
  display: flex;
  align-items: center;
  font-weight: 500;
  height: 24px;
  line-height: 24px;
  font-size: 16px;
  white-space: pre-line;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  cursor: pointer;
  @media screen and (min-width: 1024px) {
    font-weight: 600;
  }
`;

const Desc = styled.p`
  margin: 3px 0 18px;
  font-size: 14px;
  height: 63px;
  line-height: 21px;
  font-weight: 450;
  cursor: pointer;

  //텍스트 너비에 맞춰서 흘러넘치지 않게하기
  white-space: pre-line;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  //
  @media screen and (min-width: 1024px) {
    margin: 2px 0 10px;
    height: 63px;
  }
`;

const CreatedAt = styled.div`
  height: 35px;
  font-size: 13px;
  color: var(--gray-700);
  border-bottom: 1px solid var(--light-gray-300);

  @media screen and (min-width: 1024px) {
    height: 35px;
    margin: 2px 0 2px;
    border-bottom: 1px solid var(--light-gray-300);
  }
`;

const WriterInfo = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 1;
  align-items: center;
  height: 38px;

  .people-icon {
    border-radius: 50%;
    width: 26px;
    height: 26px;
    cursor: pointer;
  }
`;
const Writer = styled.div`
  font-size: 13px;
  cursor: pointer;
`;

const MainCard = ({
  title,
  content,
  createdAt,
  profile,
  nickname,
  postId,
  series,
  tag,
  userId,
  thumbnail,
}: ServerData) => {
  const navigate = useNavigate();

  const handleGoDetail = (e: React.MouseEvent<HTMLDivElement | HTMLHeadingElement | HTMLParagraphElement>) => {
    e.preventDefault();
    navigate(`/${nickname}/${postId}`);
  };

  const handleGoBlog = (e: React.MouseEvent<HTMLImageElement | HTMLDivElement>) => {
    e.preventDefault();
    navigate(`/${nickname}`);
  };
  return (
    <MainCardContainer>
      <Thumbnail onClick={handleGoDetail}>
        <img className='thumbnail-img' src={thumbnail} alt='ThumbnailImg' />
      </Thumbnail>
      <CardInfo>
        <Title onClick={handleGoDetail}>{title}</Title>
        <Desc
          onClick={handleGoDetail}
          dangerouslySetInnerHTML={{
            __html: Dompurify.sanitize(content.replace(/<(\/img|img)([^>]*)>/gi, '')),
          }}
        />
        <CreatedAt>{changeDate(createdAt)}</CreatedAt>
        <WriterInfo>
          <img onClick={handleGoBlog} src={profile} alt='profile-icon' className='people-icon'></img>
          <Writer onClick={handleGoBlog}>
            by <strong>{nickname}</strong>
          </Writer>
        </WriterInfo>
      </CardInfo>
    </MainCardContainer>
  );
};

export default MainCard;
