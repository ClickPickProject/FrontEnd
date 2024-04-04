'use client';
import Loading from '@/components/Loading';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function UserList() {
  const { data, isPending, isError } = useQuery({
    queryKey: 'users',
    queryFn: async () => {
      const res = await axios.get('/api/admin/manager/userlist');
      return res.data;
    },
  });
  if (isPending || isError) return <Loading isPending={isPending} isError={isError} />;
  return (
    <div className='grid w-full grid-cols-4 gap-2 bg-white py-2 text-center'>
      {data.content.map((user) => (
        <>
          <div className=''>{user.id}</div>
          <div className=''>{user.name}</div>
          <div className=''>{user.nickname}</div>
          <div className=''>{user.phone}</div>
        </>
      ))}
    </div>
  );
}
