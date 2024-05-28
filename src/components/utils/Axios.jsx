import axios from 'axios';
import ReqRefreshToken from './ReqRefreshToken';
import { toast } from 'react-toastify';
import { tokenState } from '@/atoms/tokenState';
import { useRecoilState } from 'recoil';
export const axiosInstance = axios.create({
  // httpsAgent: new https.Agent({
  //   rejectUnauthorized: false,
  // }),
  baseURL: `https://${process.env.NEXT_PUBLIC_BACKEND_API_URL}`,
  withCredentials: true,
});

function setHeader(key, value) {
  axiosInstance.defaults.headers.common[key] = value;
}

function removedHeader(key) {
  if (!axiosInstance.defaults.headers.common[key]) {
    return;
  }
  delete axiosInstance.defaults.headers.common[key];
}

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    if (error.response.status === 406) {
      try {
        console.log('406 error');
        const res = await ReqRefreshToken();
        console.log(res);
        if (res.status === 200) {
          console.log('406 error - 200');
          originalConfig.headers.authorization = res.headers['authorization'];
          return axiosInstance(originalConfig);
        }
      } catch (err) {
        toast.error('토큰이 만료되었습니다. 다시 로그인 해주세요.');
        removedHeader('authorization');
      }
    }
    return Promise.reject(error);
  },
);

export { setHeader, removedHeader };
