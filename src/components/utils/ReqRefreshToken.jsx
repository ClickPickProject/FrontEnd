import { tokenState } from '@/atoms/tokenState';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { axiosInstance } from './Axios';

export default async function ReqRefreshToken() {
  const [cookies, setCookie, removeCookie] = useCookies(['refresh']);
  console.log(cookies.refresh);
  const [token, setToken] = useRecoilState(tokenState);
  try {
    const refreshTokenResponse = await axiosInstance.post('/api/reissue', {
      headers: {
        // Cookie: 'refresh=Change_Refresh_Token;',
      },
    });
    const newAccessToken = refreshTokenResponse.data.token;
    setToken(newAccessToken);
  } catch (refreshError) {
    toast.error('Error refreshing token:', refreshError);
  }
}
