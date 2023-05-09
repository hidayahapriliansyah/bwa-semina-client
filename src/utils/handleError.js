import axios from 'axios';
import { config } from '../configs';

const handleError = (error) => {
  const originalRequest = error.config;
  console.log('error handleError');
  console.log(error);

  if (error.response.data.msg === 'jwt expired') {
    originalRequest._retry = true;
    const session = localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth'))
      : {};

    return axios
      .get(`${config.api_host_dev}/cms/refresh-token/${session.refreshToken}/${session.email}`)
      .then(async (res) => {
        localStorage.setItem(
          'auth',
          JSON.stringify({
            ...session,
            token: res.data.data.token,
          })
        );

        originalRequest.headers.Authorization = `Bearer ${res.data.data.token}`;

        console.log('originalRequest handleError');
        console.log(originalRequest);

        console.log('axios(originalRequest)');
        
        const newRequest = await axios(originalRequest);
        console.log(newRequest);
        return newRequest;
      })
      .catch((err) => {
        console.log('err');
        console.log(err);
        window.location.href = '/login';
        localStorage.removeItem('auth');
      });
  }

  return error;
};

export default handleError;
