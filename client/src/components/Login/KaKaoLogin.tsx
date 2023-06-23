import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { curUser } from '../../recoil/signup';

const KaKaoLogin = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentUser, setCurrentUser] = useRecoilState(curUser);
  const navigate = useNavigate();
  const API = `${process.env.REACT_APP_API_URL}`;
  const code = new URL(window.location.href).searchParams.get('code');
  // useEffect(() => {
  const grant_type = 'authorization_code';
  const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URI}`;
  const CLIENT_ID = `${process.env.REACT_APP_REST_API_APP_KEY}`;

  axios
    .post(`https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code=${code}`, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    })
    .then((res) => {
      const { access_token } = res.data;
      if (access_token) {
        axios
          .post(
            `https://kapi.kakao.com/v2/user/me`,
            {},
            {
              headers: { Authorization: `Bearer ${access_token}`, 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
            },
          )
          .then((res) => {
            const { email } = res.data.kakao_account;
            const { nickname, profile_image } = res.data.properties;
            const body = {
              email,
              name: nickname,
              nickname,
              profile: profile_image,
            };
            axios.post(`${API}/oauth/signup`, body, { withCredentials: true }).then(async (res) => {
              // if (res.status === 201) {
              //   console.log('/oauth/signup :회원가입 성공 :201');
              // } else if (res.status === 200) {
              //   console.log('/oauth/signup :이미 존재 회원 :200 ');
              // }
              window.localStorage.setItem('accessToken', res.headers.authorization);
              await axios.get(`${API}/user`, { headers: { Authorization: res.headers.authorization }, withCredentials: true }).then((res) => {
                setCurrentUser(res.data);
              });
            });
            // /oauth/signup API 캐치에러처리
            // .catch((err) => {
            //   console.log(err);
            //   console.log(err.response.status);
            // });
          });
        navigate('/main');
      } else {
        alert('카카오 로그인 실패');
        navigate('/login');
      }
    });
  // }, []);
  return (
    <>
      <h1>카카오 로그인 페이지</h1>
    </>
  );
};

export default KaKaoLogin;
