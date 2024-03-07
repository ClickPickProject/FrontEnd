'use client';
import Link from 'next/link';
import StatusView from './BestPost/StatusView';
import WriterView from './BestPost/WriterView';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const postListFetch = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_LOCAL_API_URL}/posts?_sort=-date`);
        if (res.status === 200) {
          setPosts(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    postListFetch();
  }, []);
  return (
    <div className=''>
      {posts.map((data) => (
        <>
          <ul key={data.date} className='flex w-full flex-col gap-4'>
            <WriterView writer={data.userId} date={data.date} />
            <div className='flex items-center gap-2 font-semibold'>
              <Link href={`/content/community/${data.id}`}>{data.title}</Link>
              <span className='text-center font-semibold'>[10]</span>
            </div>
            <div className='relative flex'>
              <div className='w-20 rounded-md bg-pink-200 py-[2px] text-center text-sm font-semibold'>자유</div>
              <div className='absolute right-0'>
                <StatusView />
              </div>
            </div>
            {/* 경계선 */}
            <div className='mb-4 w-full border border-gray-200' />
          </ul>
        </>
      ))}
    </div>
  );
}
