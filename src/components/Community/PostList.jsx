'use client';
import Link from 'next/link';
import StatusView from './BestPost/StatusView';
import WriterView from './BestPost/WriterView';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import { useQuery, useQueryClient } from 'react-query';
import Loading from '../Loading';

export default function PostList({ category }) {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 (1부터 시작)
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const [postsPerPage, setPostsPerPage] = useState(10); // 페이지당 게시글 개수
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [sortedPosts, setSortedPosts] = useState([]);
  const queryClient = useQueryClient();

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery(
    ['posts'],
    async () => {
      const res = await axios.get(`/api/post/list`, {
        params: {
          page: currentPage - 1, // 페이지 번호가 0부터 시작하므로 -1
        },
      });
      return res.data;
    },
    {
      onSuccess: (data) => {
        const sortedPosts = [...data.content].sort((a, b) => {
          return new Date(b.createAt) - new Date(a.createAt);
        });
        setSortedPosts(sortedPosts);
        setTotalPages(data.totalPages);
        setTotalItems(data.totalElements);
        setPostsPerPage(data.size);
      },
    },
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredPosts = sortedPosts.filter((post) => {
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
  const [search, setSearch] = useState('');
  const onClickSearch = async (e) => {
    try {
      const res = await axios.get('/api/post/title', {
        params: {
          title: search,
        },
      });
      if (res.status === 200) {
        console.log(res.data);
        queryClient.invalidateQueries(['posts']);
      }
    } catch (err) {
      console.log(err);
    }
  };
  if (isLoading || isError) return <Loading isLoading={isLoading} isError={isError} />;
  return (
    <div className=''>
      <div className='relative mb-4'>
        <input
          type='text'
          placeholder='검색어를 입력하세요.'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-full rounded-md border border-gray-300 px-3 py-2'
        />
        <button className='absolute right-0 mr-2 h-full items-center' onClick={onClickSearch}>
          검색
        </button>
      </div>
      <ul>
        {filteredPosts.map((data) => (
          <li key={data.postId} className='flex w-full flex-col gap-4'>
            <WriterView writer={data.nickname} date={data.createAt} />
            <div className='flex items-center gap-2 font-semibold'>
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
          pageRangeDisplayed={10}
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
