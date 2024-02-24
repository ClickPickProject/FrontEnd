'use client';
import Link from 'next/link';
import StatusView from './BestPost/StatusView';
import WriterView from './BestPost/WriterView';

export default function PostList() {
  return (
    <div className='flex w-full flex-col gap-4'>
      <WriterView />
      <div className='flex items-center gap-2 font-semibold'>
        <Link href='#'>오늘 별마당 도서관에서 이벤트 하나봐요</Link>
        <span className='text-center font-semibold'>[224]</span>
      </div>
      <div className='relative flex'>
        <div className='w-20 rounded-md bg-pink-200 py-[2px] text-center text-sm font-semibold'>자유</div>
        <div className='absolute right-0'>
          <StatusView />
        </div>
      </div>
      {/* 경계선 */}
      <div className='mb-4 w-full border border-gray-200' />
    </div>
  );
}
