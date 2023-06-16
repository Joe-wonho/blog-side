import axios from 'axios';
// import { accessToken } from '../recoil/signup';
// import { useRecoilValue } from 'recoil';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    // Authorization: `Bearer ${JSON.parse(token)}`,
  },
});

export default client;
