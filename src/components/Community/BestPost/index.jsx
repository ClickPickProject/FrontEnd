'use client';
import Image from 'next/image';
import StatusView from './StatusView';
import WriterView from './WriterView';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useQuery } from 'react-query';
import Loading from '@/components/Loading';

export default function BestPost() {
  const {
    data: bestPosts,
    isLoading,
    isError,
  } = useQuery(['bestPosts'], async () => {
    const res = await axios.get('/api/post/list/best');
    return res.data;
  });
  if (isLoading || isError) return <Loading isLoading={isLoading} isError={isError} />;
  return (
    <>
      {bestPosts.map((data) => (
        <div className='relative flex flex-col overflow-hidden rounded-lg'>
          <>
            <div className='absolute left-2 top-1 z-10 flex h-[30px] w-[150px] -translate-x-[50px] translate-y-[15px] -rotate-45 transform items-center justify-center bg-pink-400 p-2 text-xl font-bold'>
              BEST
            </div>
            <figure className='relative mb-2'>
              <Link href={`/content/community/${data.postId}`}>
                <Image
                  alt='#'
                  src='/sakura.jpg'
                  width={270}
                  height={170}
                  className='h-[170px] w-[270px] rounded-lg object-cover'
                />
              </Link>
            </figure>
            <div className='flex h-full w-full flex-col gap-2'>
              <Link href={`/content/community/${data.postId}`}>
                <div className='flex w-[250px] items-center'>
                  <h2 className='overflow-hidden text-ellipsis whitespace-nowrap text-base font-bold'>
                    {/* 신전 앞에 봄바람과 춤추는 꽃잎입니다... */}
                    {data.title}
                  </h2>
                  <span className='text-center text-sm font-semibold'>[{data.commentCount}]</span>
                </div>
              </Link>
              <WriterView writer={data.writer} date={data.createAt} />
              <StatusView viewCount={data.viewCount} likeCount={data.likeCount} />
            </div>
          </>
        </div>
      ))}
    </>
  );
}
