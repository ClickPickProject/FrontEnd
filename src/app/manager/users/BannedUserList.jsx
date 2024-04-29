'use client';
import Loading from '@/components/Loading';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function BannedUserList() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['banndUsers'],
    queryFn: async () => {
      const res = await axios.get('/api/admin/banuserlist');
      return res.data;
    },
  });
  if (isPending || isError) return <Loading isPending={isPending} isError={isError} />;
  return (
    <>
      {data.content.map((user, idx) => (
        <div className='grid w-full grid-cols-5 gap-2 bg-white py-2 text-center' key={idx}>
          <div className=''>{user.id}</div>
          <div className=''>{user.name}</div>
          <div className=''>{user.nickname}</div>
          <div className=''>{user.phone}</div>
          <div className=''>{`${user.startDate.split('T')[0]} ~ ${user.endDate.split('T')[0]}`}</div>
        </div>
      ))}
    </>
  );
}
