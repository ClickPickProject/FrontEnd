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
export default function HomeNowPost() {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 (1부터 시작)
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const [postsPerPage, setPostsPerPage] = useState(3); // 페이지당 게시글 개수
  const [totalItems, setTotalItems] = useState(0); // 모든 게시글 수
  const {
    data: posts,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['posts', currentPage],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/post/list`, {
        params: {
          page: currentPage - 1, // 페이지 번호가 0부터 시작하므로 -1
        },
      });
      if (res.status === 200) {
        setTotalPages(res.data.totalPages);
        setTotalItems(res.data.totalElements);
        setPostsPerPage(res.data.size);
      }
      return res.data;
    },
  });
  if (isPending || isError) return <Loading isPending={isPending} isError={isError} />;

  return (
    <>
      {posts.content.slice(0, 4).map((data) => (
        <li key={data.postId} className=' flex w-full flex-col gap-4'>
          <HomePostWriter
            writer={data.nickname}
            date={data.createAt}
            profile={data.profileUrl}
            viewCount={data.viewCount}
            likeCount={data.likeCount}
          />
          <Link href={`/content/community/${data.postId}`}>{data.title}</Link>
        </li>
      ))}
    </>
  );
}
