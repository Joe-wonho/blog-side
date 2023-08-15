## ✨ Blog

<a href="https://ibb.co/VN0Ft5r"><img src="https://i.ibb.co/6ZcKmLV/blog.png" alt="blog" style="border-radius: 10px; width:300px"></a>

- 프로젝트 기간 : 2023.06.07 ~ 2023.07.18

- 프로젝트 설명<br>
  해당 웹사이트는 벨로그를 모티브로 만들었습니다.
  기본 CRUD 기능을 토대로 지난번 **루미안** 프로젝트 때 아쉬웠던 부분을 보완하기 위해 제작하였습니다.

- 배포 링크 : <a href ="https://blog-side-prj.store/" target = "_blank" > Blog </a>

- 프론트 : [조원호](https://github.com/Joe-wonho)

- 프론트 블로그 : [이번 프로젝트에 대한 블로깅 목록](https://velog.io/@whdnjsgh22/series/%ED%86%A0%EC%9D%B4%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8)

- 백엔드 : [김현지](https://github.com/HJKKIM)

- 백엔드 블로그 : [이번 프로젝트에 대한 블로깅 목록](https://upgrade-myself.tistory.com/486)

- API Docs : [노션 API Docs](https://www.notion.so/API-Docs-c2602a9bda654ae9ab5a3ecae82d892c)
- 일정관리 : [노션 ](https://www.notion.so/ebf28fa36c104f9e85a3fcb024c6d3a9?v=603c10569c764573b8c5329e81e7b5c4&pvs=4)
  <br><br>

---

<br>

## 🛠️ 지난번 대비 개선 사항 및 기능

<br>

<details>
<summary>👉🏻 프론트 기능 / 개선 사항</summary>
<div markdown="1">
<br>

1. Typescript 사용 : 타입 안정성을 위해 사용.

2. 에디터 사용 : rich-text editor 인 quill 사용.

3. 로그인 및 인증 관련 처리 : 지난번 프론트에서 자체적으로 처리한 토큰을
   서버에서 관리하며 **axios intercepter**를 이용한 토큰 재발급 자동화 및
   토큰 만료 처리.

4. OAuth 2.0 사용 : 지난번 소셜로그인 기능을 처리하지 못해 이번에 카카오 로그인
   기능 사용.

5. custom axios 사용 : 매 요청마다 헤더에 일일이 썼던 코드를 최소화 하기 위해
   axios create , axios intercepter 사용.

6. 스켈레톤 스크린(Skeleton Screen) 적용 : 메인 페이지의 모든 Postings를
   불러올 때 사용자 경험을 고려해 사용.
   (하지만 블로그와 같은 정적 페이지의 같은 경우 잘 어울리지 않다고 깨달음)

7. 이미지 업로드 처리 방법 변경 : 지난번엔 Base64로 인코딩 된 이미지 파일을
   그냥 넘겼지만 이번엔 s3를 사용해 이미지 url로 변환 후 이미지 업로드 처리.

8. 쿠키에 대한 보안 강화를 위해 https 적용 및 도메인 연결

</div>
</details>
<br>
<details>
<summary>👉🏻 백엔드 기능 / 개선 사항</summary>
<div markdown="1">
<br>

1. 강화된 사용자 인증 방식 : 로그인 시 Access Token과 Refresh Token을 발급하여 보다 안전한 인증을 구현했습니다. Access Token 만료시 Refresh Token을 활용하여 Access Token을 갱신할 수 있도록 하였습니다.

2. 로그아웃 및 토큰 관리 강화 : Redis를 이용하여 로그아웃 시 토큰 관리를 강화했습니다. 사용자 정보를 기반으로 Redis에서 데이터를 삭제하고, 만료된 Access Token을 블랙리스트로 관리하여 보안을 강화하였습니다.

3. 카카오 OAuth 2.0 연동 : 카카오 로그인을 통한 OAuth 2.0 연동을 통해 손쉬운 회원가입 및 로그인 절차를 구현하였습니다.

4. 요청 데이터 처리 방식 개선 : 회원 가입 및 정보 수정 시 JSON 대신 폼 데이터 형식을 사용하여 사용자 친화적인 데이터 처리를 지원하였습니다. 프로필 이미지 등의 데이터도 함께 처리하여 사용자 경험을 향상시켰습니다.

5. AWS S3를 활용한 이미지 저장 :  AWS S3 버킷을 통해 이미지 파일 업로드 및 수정을 가능하게 하여, 사용자들이 이미지를 효과적으로 관리할 수 있도록 지원했습니다.

6. 검색 기능 강화 : 특정 title 검색어와 일치하는 게시글 조회 기능을 추가하여 사용자들이 원하는 내용을 쉽게 찾을 수 있도록 하였습니다.

7. 시리즈(카테고리) 및 게시글 조회 강화 : 사용자가 게시글에 태그를 추가하여 관련 게시글을 쉽게 찾을 수 있도록 하였습니다. 중복 없는 태그 저장 및 게시글과 태그 간의 관계를 효율적으로 관리하였습니다.

8. 태그 기능 추가 : 사용자가 게시글을 작성시 해당 게시글에 태그 추가 가능. 클라이언트가 전달한 태그들은 중복 없이 저장되며, 게시글과 태그 사이의 연결을 PostTag 엔티티를 활용하여 저장. 특정 사용자의 닉네임을 입력받아 해당 사용자가 작성한 게시글 중 지정한 태그에 해당되는 게시글을 조회할 수 있는 api 작성.

9. 보안 강화를 위한 https 적용: 쿠키에 대한 보안 강화를 위해 HTTPS 프로토콜을 도입하였습니다.
    
</div>
</details>
<br>

---

<br>

## ⚙️ 툴소개

|                     공통                      |                                                                             Front End                                                                             |                                                                                                   Back End                                                                                                    |
| :-------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| **`Discord`**<br>**`Github`**<br>**`Notion`** | **`TypeScript`**<br>**`React`**<br>**`React-Router`**<br>**`Recoil`**<br>**`Styled-Components`**<br>**`Axios`**<br>**`ESLint`**<br>**`Prettier`**<br>**`AWS S3`** <br>**`AWS CloudFront`** <br>**`AWS Route53`** <br>**`AWS Certificate Manager`**<br>**`react-quill`** | **`Java`**<br>**`JPA`**<br>**`Intellijidea`**<br>**`Spring-MVC`**<br>**`Spring-Boot`**<br>**`Spring-Security`**<br>**`Gradle`**<br>**`JWT`**<br>**`AmazoneC2`**<br>**`Mysql`**<br>**`H2`**<br>**`Redis`**<br>**`AWS ElastiCache`**<br>**`AWS Route 53`**<br>**`AWS Certificate Manager`**<br> |

<br>

---

<br>

## 🗂️ Pages

|                        Signup/Login Page                        |                      Kakao Login Page                       |
| :-------------------------------------------------------------: | :---------------------------------------------------------: |
| ![회원가입 페이지](https://i.ibb.co/418sXty/image.gif) | ![로그인 페이지](https://i.ibb.co/VDC9xPK/image.gif) |

|                         Main Page                         |                       Detail Page                        |
| :-------------------------------------------------------: | :------------------------------------------------------: |
| ![1_메인페이지](https://i.ibb.co/0VX7cVV/image.gif) | ![2_디테일페이지](https://i.ibb.co/tHB6T3W/image.gif) |

|                       MyInfo Page                       |                       MyPosting Page                        |
| :-----------------------------------------------------: | :---------------------------------------------------------: |
| ![3_마이페이지_](https://i.ibb.co/SJMGf4J/image.gif) | ![마이포스팅 페이지](https://i.ibb.co/6HpSb4F/image.gif) |

|                     Write Page                      |
| :-------------------------------------------------: |
| ![5_작성페이지](https://i.ibb.co/Dwts76C/image.gif) |

</br>

<br>
<br>

---

<br>

### 🌲 Branch

`main` : 서비스 운영 브랜치 </br>

`dev` : 메인 브랜치 배포전 릴리즈 브랜치
</br>

`dev-fe` : FE 개발 환경 브랜치
</br>

`dev-be` : BE 개발 환경 브랜치
