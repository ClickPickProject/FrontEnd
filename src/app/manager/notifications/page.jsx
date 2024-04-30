'use client';
import NoticePostList from '@/components/NoticePostList';
import { useRouter } from 'next/navigation';

export default function NotificationsPage() {
  const router = useRouter();
  return (
    <>
      <div className='flex flex-col gap-2 p-12'>
        <button
          onClick={() => router.push('/manager/notifications/write')}
          className='text-md w-32 rounded-md bg-pink-300 py-2 font-semibold transition-all hover:bg-pink-500'
        >
          공지사항 작성
        </button>
        <div className='w-full'>
          <NoticePostList admin />
        </div>
      </div>
    </>
  );
}
