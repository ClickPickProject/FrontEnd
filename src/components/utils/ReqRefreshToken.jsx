import { tokenState } from '@/atoms/tokenState';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';

export default async function ReqRefreshToken() {
  const [token, setToken] = useRecoilState(tokenState);
  if (err.response.status === 406) {
    try {
      const refreshTokenResponse = await axios.post('/api/reissue', {
        withCredentials: true,
        headers: {
          Authorization: token,
          Cookie: 'refresh=Change_Refresh_Token;',
        },
      });
      const newAccessToken = refreshTokenResponse.data.token;
      setToken(newAccessToken);
    } catch (refreshError) {
      toast.error('Error refreshing token:', refreshError);
    }
  } else {
    toast.error('Error fetching tokens:', err);
  }
}
