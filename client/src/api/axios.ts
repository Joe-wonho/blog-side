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
      } catch (error) {
        window.localStorage.removeItem('accessToken');
        window.localStorage.removeItem('recoil-persist');
        alert('토큰이 만료되었습니다.');
        window.location.href = `/login`;
      }
    }
    return;
    // return Promise.reject(error);
  }
);

export default client;
