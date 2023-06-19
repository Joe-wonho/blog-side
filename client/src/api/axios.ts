import axios from 'axios';
// import { accessToken } from '../recoil/signup';
// import { useRecoilValue } from 'recoil';
const storageItem = window.localStorage.getItem('recoil-persist');
let token = '';
if (storageItem) {
  token = JSON.parse(storageItem).accessToken;
}

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    Authorization: token,
  },
});

export default client;
