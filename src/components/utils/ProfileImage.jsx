import { tokenState } from '@/atoms/tokenState';
import axios from 'axios';
import { useRecoilValue } from 'recoil';

const ProfileImage = async () => {
  const token = useRecoilValue(tokenState);
  const res = axios.get('https://clickpick.iptime.org:8080/api/profile/image', {
    headers: {
      Authorization: token,
    },
  });
  return res.data.url;
};

export { ProfileImage };
