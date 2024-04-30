'use client';
import { tokenState } from '@/atoms/tokenState';
import Loading from '@/components/Loading';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRecoilValue } from 'recoil';

export default function NormalUserList() {
  const token = useRecoilValue(tokenState);
  const { data, isPending, isError } = useQuery({
    queryKey: ['normalUsers'],
    queryFn: async () => {
      const res = await axios.get('/api/admin/userlist', {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    },
  });
  const normalUsers = data?.content.filter((user) => user.userStatus === 'NORMAL');
  if (isPending || isError) return <Loading isPending={isPending} isError={isError} />;
  return (
    <>
      {normalUsers.map((user, idx) => (
        <div className='grid w-full grid-cols-5 gap-2 bg-white py-2 text-center' key={idx}>
          <div className=''>{user.id}</div>
          <div className=''>{user.name}</div>
          <div className=''>{user.nickname}</div>
          <div className=''>{user.phone}</div>
          <div className=''>{user.createAt.split('T')[0]}</div>
        </div>
      ))}
    </>
  );
}
