import axios from 'axios';

let token = window.localStorage.getItem('accessToken');

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    Authorization: token,
  },
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
        const res = await client.post('/refresh');
        window.localStorage.setItem('accessToken', res.headers.authorization);
        token = window.localStorage.getItem('accessToken');
        originalRequest.headers = {
          Authorization: token,
        };
        return await axios(originalRequest);
      } catch (error) {
        console.log(error);
      }
    }
    return Promise.reject(error);
  },
);

// async function (error) {
//   if (error.response && error.response.status === 401) {
//     try {
//       const originalRequest = error.config;
//       const res = await client.post('/refresh');
//       if (res) {
//         window.localStorage.setItem('accessToken', res.headers.authorization);
//         originalRequest.headers.authorization = res.headers.authorization;
//         return await client.request(originalRequest);
//       }
//     } catch (error) {
//       window.localStorage.removeItem('accessToken');
//       console.log(error);
//     }
//     return Promise.reject(error);
//   }
//   return Promise.reject(error);
// },
// );

// client.interceptors.request.use(
//   function (config) {
//       const user = localStorage.getItem('user');
//       const
//       if (!user) {
//           config.headers["accessToken"] = null;
//           config.headers["refreshToken"] = null;
//           return config
//       }
//       const { accessToken, refreshToken } = JSON.parse(user)
//       config.headers["accessToken"] = accessToken;
//       config.headers["refreshToken"] = refreshToken;
//       return config
//   }
// )

export default client;
