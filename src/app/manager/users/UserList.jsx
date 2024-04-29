'use client';
import Loading from '@/components/Loading';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function UserList() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axios.get('/api/admin/userlist');
      return res.data;
    },
  });

  if (isPending || isError) return <Loading isPending={isPending} isError={isError} />;
  return (
    <>
      {data.content.map((user, idx) => (
        <div className='grid w-full grid-cols-6 gap-2 bg-white py-2 text-center' key={idx}>
          <div className=''>{user.id}</div>
          <div className=''>{user.name}</div>
          <div className=''>{user.nickname}</div>
          <div className=''>{user.phone}</div>
          <div className=''>{user.createAt.split('T')[0]}</div>
          <div className=''>
            {user.userStatus === 'NORMAL' ? (
              <span className='rounded-full bg-blue-500 px-2 text-white'>일반</span>
            ) : (
              <span className='rounded-full bg-red-500 px-2 text-white'>정지됨</span>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
