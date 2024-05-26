'use client';
import { FillMapIcon } from '../UI/Icons';
import HomePostWriter from './HomePostWriter';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import Loading from '../Loading';
import { axiosInstance } from '../utils/Axios';
export default function HomeBestPost() {
  const {
    data: bestPosts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['bestPosts'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/post/list/best');
      return res.data;
    },
  });
  if (isLoading || isError) return <Loading isLoading={isLoading} isError={isError} />;
  return (
    <>
      {bestPosts?.slice(0, 1).map((data) => (
        <>
          <Link href={`/content/community/${data.postId}`} className=''>
            <figure className='flex w-full items-center justify-center'>
              <Image
                alt='#'
                src={`${data.thumbnail === null || data.thumbnail.length === 0 ? '/Images/camera.png' : data.thumbnail}`}
                width={300}
                height={180}
                className='mb-4 h-[180px] rounded-[4px] object-cover'
              />
            </figure>
            <h2 className='text-lg font-bold'>{data.title}</h2>
          </Link>
          <HomePostWriter
            writer={data.nickname}
            date={data.createAt}
            profile={data.profileUrl}
            viewCount={data.viewCount}
            likeCount={data.likeCount}
          />
        </>
      ))}
    </>
  );
}
