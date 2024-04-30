'use client';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import { useQuery } from '@tanstack/react-query';
import Loading from './Loading';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

export default function NoticePostList() {
  dayjs.extend(relativeTime);
  dayjs.locale('ko');
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 (1부터 시작)
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const [postsPerPage, setPostsPerPage] = useState(10); // 페이지당 게시글 개수
  const [totalItems, setTotalItems] = useState(0);

  const {
    data: posts,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['posts', currentPage],
    queryFn: async () => {
      const res = await axios.get(`/api/notice/list`, {
        params: {
          page: currentPage - 1, // 페이지 번호가 0부터 시작하므로 -1
        },
      });
      return res.data;
    },
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    refetch();
  };

  if (isPending || isError) return <Loading isPending={isPending} isError={isError} />;

  return (
    <div>
      <ul className='flex flex-col gap-8'>
        <div className='flex justify-between border-b-2 border-pink-500 px-2 pb-4 text-lg font-bold'>
          <div className='flex flex-1 justify-center'>제목</div>
          <div className='flex justify-center'>작성일</div>
        </div>
        {posts.content.map((data) => (
          <li key={data.postId} className='flex w-full flex-col'>
            <div className='text-md relative flex items-center pl-4 font-semibold'>
              <Link href={`/content/notice/${data.noticeId}`}>{data.title}</Link>
              <div className='absolute right-0'>{data.createAt ? dayjs(data.createAt).fromNow() : null}</div>
            </div>
            {/* 경계선 */}
            <div className='mt-4 w-full border border-gray-200' />
          </li>
        ))}
      </ul>

      <div className='py-4'>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={postsPerPage}
          totalItemsCount={totalItems}
          onChange={handlePageChange}
          itemClass='px-3 py-1 rounded-md mr-2 cursor-pointer'
          activeClass='bg-pink-400 text-white'
          itemClassFirst='px-3 py-1 rounded-md mr-2 cursor-pointer'
          itemClassPrev='px-3 py-1 rounded-md mr-2 cursor-pointer'
          itemClassNext='px-3 py-1 rounded-md mr-2 cursor-pointer'
          itemClassLast='px-3 py-1 rounded-md mr-2 cursor-pointer'
          innerClass='flex'
        />
      </div>
    </div>
  );
}
