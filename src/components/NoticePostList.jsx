'use client';
import Link from 'next/link';
// import WriterView from './BestPost/WriterView';
import { useState } from 'react';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import { useQuery } from '@tanstack/react-query';
import Loading from './Loading';
import WriterView from './Community/BestPost/WriterView';
import StatusView from './Community/BestPost/StatusView';

export default function NoticePostList() {
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
      const res = await axios.get(`/api/post/list`, {
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

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const onClickSearch = async (e) => {
    try {
      const res = await axios.get('/api/post/title', {
        params: {
          title: search,
        },
      });
      if (res.status === 200) {
        setSearchResults(res.data.content);
      }
    } catch (err) {
      console.log(err);
    }
  };
  if (isPending || isError) return <Loading isPending={isPending} isError={isError} />;
  return (
    <div className=''>
      <div className='relative mb-4 w-1/3'>
        <input
          type='text'
          placeholder='검색어를 입력하세요.'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-full rounded-lg border-2 border-pink-300 px-3 py-2 outline-none'
        />
        <button className='absolute right-0 mr-2 h-full items-center' onClick={onClickSearch}>
          검색
        </button>
      </div>
      <ul>
        {posts.content.map((data) => (
          <li key={data.postId} className='flex w-full flex-col gap-4'>
            <WriterView writer={data.nickname} date={data.createAt} />
            <div className='relative flex items-center gap-2 font-semibold'>
              <Link href={`/content/community/${data.postId}`}>{data.title}</Link>
              <span className='text-center font-semibold'>[{data.commentCount}]</span>
              <div className='absolute right-0'>
                <StatusView viewCount={data.viewCount} />
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
