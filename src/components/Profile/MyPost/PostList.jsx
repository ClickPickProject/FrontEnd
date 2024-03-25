'use client';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import Link from 'next/link';
import Search from '@/components/Search';
import Loading from '@/components/Loading';
import WriterView from '@/components/Community/BestPost/WriterView';
import StatusView from '@/components/Community/BestPost/StatusView';
import { tokenState } from '@/atoms/tokenState';
import { useRecoilValue } from 'recoil';
export default function PostList({ category }) {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 (1부터 시작)
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const [postsPerPage, setPostsPerPage] = useState(10); // 페이지당 게시글 개수
  const [totalItems, setTotalItems] = useState(0); // 모든 게시글 수
  const [selectedCategory, setSelectedCategory] = useState(category);
  const token = useRecoilValue(tokenState);
  useEffect(() => {
    setSelectedCategory(category);
    setCurrentPage(1);
  }, [category]);

  const {
    data: posts,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['posts', currentPage],
    queryFn: async () => {
      const res = await axios.get(`/api/member/post/list`, {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
        params: {
          page: currentPage - 1,
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    refetch();
  };
  // 카테고리 필터링
  const filteredPosts = posts?.content?.filter((post) => {
    switch (selectedCategory) {
      case '자유':
        return post.postCategory === '자유';
      case '음식':
        return post.postCategory === '음식';
      case '여행지':
        return post.postCategory === '여행지';
      default:
        return true;
    }
  });
  const displayPosts = filteredPosts;
  if (isPending || isError) return <Loading isPending={isPending} isError={isError} />;

  return (
    <div>
      <ul>
        {displayPosts?.map((data) => (
          <li key={data.postId} className='flex w-full flex-col gap-4'>
            <WriterView writer={data.nickname} date={data.createAt} />
            <div className='flex items-center gap-1 font-semibold'>
              <Link href={`/content/community/${data.postId}`}>{data.title}</Link>
              <span className='text-center font-semibold'>[{data.commentCount}]</span>
            </div>
            <div className='relative flex'>
              <div className='w-20 rounded-md bg-pink-200 py-[2px] text-center text-sm font-semibold'>
                {data.postCategory}
              </div>
              <div className='absolute right-0'>
                <StatusView viewCount={data.viewCount} likeCount={data.likeCount} />
              </div>
            </div>
            {/* 경계선 */}
            <div className='mb-4 w-full border border-gray-200' />
          </li>
        ))}
      </ul>

      <div className=''>
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
