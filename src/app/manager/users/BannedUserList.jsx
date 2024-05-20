'use client';
import Loading from '@/components/Loading';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import BannedUserModal from './BannedUserModal';
import { banPeriodModalState } from '@/atoms/commentState';
import { axiosInstance } from '@/components/utils/Axios';

export default function BannedUserList() {
  const queryClient = useQueryClient();
  const [banPeriodUser, setBanPeriodUser] = useState('');
  const [banPeriodModal, setBanPeriodModal] = useRecoilState(banPeriodModalState);
  const { data, isPending, isError } = useQuery({
    queryKey: ['banndUsers'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/admin/banuserlist');
      return res.data;
    },
  });

  const onClickDelete = async (userId) => {
    try {
      const res = await axiosInstance.delete(`/api/admin/ban/${userId}`);
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
              className='cursor-pointer rounded-full bg-red-500 px-2 text-white transition-all hover:scale-105 hover:bg-red-700'
            >
              정지 해제
            </span>
            <span
              onClick={() => {
                setBanPeriodModal(true);
                setBanPeriodUser(user.id);
              }}
              className='cursor-pointer rounded-full bg-indigo-500 px-2 text-white transition-all hover:scale-105 hover:bg-indigo-700'
            >
              기간 변경
            </span>
          </div>
          <div className=''>{user.name}</div>
          <div className=''>{user.nickname}</div>
          <div className=''>{user.phone}</div>
          <div className=''>{`${user.startDate.split('T')[0]} ~ ${user.endDate.split('T')[0]}`}</div>
        </div>
      ))}
      {banPeriodModal && (
        <>
          <div
            className='fixed inset-0 z-10 overflow-y-auto'
            onKeyDown={(e) => {
              if (e.code === 'Escape') setBanPeriodModal(false);
            }}
          >
            <div className='flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0'>
              <div>
                <BannedUserModal userId={banPeriodUser} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
