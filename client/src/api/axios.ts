import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});
client.interceptors.request.use(function (config) {
  const token = window.localStorage.getItem('accessToken');
  config.headers.Authorization = token;
  return config;
});

client.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    const originalRequest = config;

    if (status === 401) {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/refresh`, {}, { withCredentials: true });
        window.localStorage.setItem('accessToken', res.headers.authorization);
        const token = window.localStorage.getItem('accessToken');
        originalRequest.headers = {
          Authorization: token,
        };
        return await axios(originalRequest);

        // .catch((err) => {
        //   console.log('refresh후 catch');
        // window.localStorage.removeItem('accessToken');
        // window.localStorage.removeItem('recoil-persist');
        // window.location.href = `${process.env.REACT_APP_API_URL}/login`;
        // alert('로그인 시간이 만료되었습니다. 다시 로그인 해주세요.');
        // return;
        // });
      } catch (error) {
        // console.log('try catch 의 캐치문');
        window.localStorage.removeItem('accessToken');
        window.localStorage.removeItem('recoil-persist');
        alert('토큰이 만료되었습니다. 다시 로그인해 주세요');
        //Refresh 토큰도 없애기 + 에러페이지 보이지 않게하기
        window.location.href = `http://localhost:3000/login`;
      }
    }
    return Promise.reject(error);
  },
);

export default client;
