'use client';
import { tokenState } from '@/atoms/tokenState';
import Loading from '@/components/Loading';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { use } from 'react';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';

export default function BannedUserList() {
  const queryClient = useQueryClient();
  const token = useRecoilValue(tokenState);
  const { data, isPending, isError } = useQuery({
    queryKey: ['banndUsers'],
    queryFn: async () => {
      const res = await axios.get('/api/admin/banuserlist', {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    },
  });
  const onClickDelete = async (userId) => {
    try {
      const res = await axios.delete(`/api/admin/ban/${userId}`, {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200) {
        queryClient.invalidateQueries(['banndUsers']);
        toast.success(`${userId} 정지가 해제되었습니다.`);
      }
    } catch (error) {
      toast.error('처리 중 오류가 발생했습니다.');
    }
  };
  if (isPending || isError) return <Loading isPending={isPending} isError={isError} />;
  return (
    <>
      {data.content.map((user, idx) => (
        <div className='grid w-full grid-cols-5 gap-2 bg-white py-2 text-center' key={idx}>
          <div className='flex justify-center gap-2'>
            {user.id}
            <span
              onClick={() => onClickDelete(user.id)}
              className='cursor-pointer rounded-full bg-red-500 px-2 text-white transition-all hover:scale-105 hover:bg-blue-700'
            >
              정지 해제
            </span>
          </div>
          <div className=''>{user.name}</div>
          <div className=''>{user.nickname}</div>
          <div className=''>{user.phone}</div>
          <div className=''>{`${user.startDate.split('T')[0]} ~ ${user.endDate.split('T')[0]}`}</div>
        </div>
      ))}
    </>
  );
}
