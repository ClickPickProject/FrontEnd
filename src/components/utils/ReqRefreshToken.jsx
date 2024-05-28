import { MyNicknameState, tokenState } from '@/atoms/tokenState';
import { toast } from 'react-toastify';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { axiosInstance, setHeader } from './Axios';

export default async function ReqRefreshToken() {
  // const [token, setToken] = useRecoilState(tokenState);
  // const setMyNickname = useSetRecoilState(MyNicknameState);
  try {
    const refreshTokenResponse = await axiosInstance.post('/api/reissue', {
      headers: {
        authorization: token,
      },
    });
    const newAccessToken = refreshTokenResponse.headers['authorization'];
    // setHeader('authorization', newAccessToken);
    // setToken(newAccessToken);
    // setMyNickname(refreshTokenResponse.data.nickname);
    console.log('reqRefreshToken', refreshTokenResponse);
  } catch (refreshError) {
    toast.error('토근이 만료되었습니다.', refreshError);
  }
}
