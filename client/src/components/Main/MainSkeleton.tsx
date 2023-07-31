import styled, { keyframes } from 'styled-components';
const loading = keyframes`
   0% {
    opacity: 0.4;
    }
    10%{opacity: 1;}
    20%{opacity: 0.4;}
    30%{opacity: 1;}
    40%{opacity: 0.4;}
    50%{opacity: 1;}
    60%{opacity: 0.4;}
    70%{opacity: 1;}
    80%{opacity: 0.4;}
    90%{opacity: 1;}
    100%{opacity: 0.4;}
`;
const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  height: auto;
  background-color: white;
  border-radius: 5px;
  animation: ${loading} 8s infinite;

  @media screen and (min-width: 662px) and (max-width: 1023px) {
    width: 48%;
  }
  @media screen and (max-width: 661px) {
    width: 100%;
  }
`;

//여기
const SkeletonThumbnail = styled.div`
  .thumbnail-img {
    background-color: var(--light-gray-200);
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

const SkeletonCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

//여기
const SkeletonTitle = styled.h4`
  background-color: var(--light-gray-200);
  display: flex;
  width: 80%;
  align-items: center;
  height: 24px;
  border-radius: 8px;
`;

//여기
const Desc = styled.p`
  background-color: var(--light-gray-200);
  margin: 3px 0 18px;
  height: 63px;
  line-height: 21px;
  border-radius: 8px;

  @media screen and (min-width: 1024px) {
    margin: 2px 0 10px;
    height: 63px;
  }
`;

//여기
const CreatedAt = styled.div`
  background-color: var(--light-gray-200);
  height: 35px;
  border-radius: 8px;

  @media screen and (min-width: 1024px) {
    height: 35px;
    margin: 2px 0 2px;
  }
`;

const WriterInfo = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 1;
  align-items: center;
  height: 38px;

  //여기
  .people-icon {
    border-radius: 50%;
    width: 26px;
    height: 26px;
    background-color: var(--light-gray-200);
  }
`;
//여기
const Writer = styled.div`
  width: 60px;
  height: 15px;
  background-color: var(--light-gray-200);
  border-radius: 8px;
`;

const MainSkeleton = () => {
  return (
    <SkeletonContainer>
      <SkeletonThumbnail>
        <div className='thumbnail-img' />
      </SkeletonThumbnail>
      <SkeletonCardInfo>
        <SkeletonTitle />
        <Desc />
        <CreatedAt></CreatedAt>
        <WriterInfo>
          <div className='people-icon'></div>
          <Writer />
        </WriterInfo>
      </SkeletonCardInfo>
    </SkeletonContainer>
  );
};

export default MainSkeleton;
