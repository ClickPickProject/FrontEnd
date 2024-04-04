'use client';
import Link from 'next/link';
import { TbMessageCircleQuestion } from 'react-icons/tb';
// import WriterView from './BestPost/WriterView';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import { useQuery } from '@tanstack/react-query';
import Loading from './Loading';
import WriterView from './Community/BestPost/WriterView';
import StatusView from './Community/BestPost/StatusView';
import { loginState } from '@/atoms/tokenState';
import { useRecoilValue } from 'recoil';
import Search from './Search';
import { PencilIcon } from './UI/Icons';
import CenterSearch from './CenterSearch';
export default function NoticePostList() {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 (1부터 시작)
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const [postsPerPage, setPostsPerPage] = useState(10); // 페이지당 게시글 개수
  const [totalItems, setTotalItems] = useState(0);
  const isLogin = useRecoilValue(loginState);
  const [searchOption, setSearchOption] = useState('title'); // 검색 옵션 (기본값: 제목검색)
  const [search, setSearch] = useState(''); // 검색어
  const [searchResults, setSearchResults] = useState(null); // 검색 결과
  const [answer, setAnswer] = useState('false');
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

  // 검색 결과 처리
  const handleSearchResults = (res) => {
    if (res.status === 200) {
      setSearchResults(res.data.content);
      setTotalPages(res.data.totalPages);
      setTotalItems(res.data.totalElements);
      setCurrentPage(1);
    }
  };

  // 검색 함수 정의 (제목, 내용, 해시태그)
  const searchByTitle = async () => {
    try {
      const res = await axios.get('/api/post/title', {
        params: {
          title: search,
        },
      });
      handleSearchResults(res);
    } catch (err) {
      console.log(err);
    }
  };

  const searchByContent = async () => {
    try {
      const res = await axios.get('/api/post/content', {
        params: {
          content: search,
        },
      });
      handleSearchResults(res);
    } catch (err) {
      console.log(err);
    }
  };

  // 검색 버튼 클릭 핸들러
  const onClickSearch = async (e) => {
    e.preventDefault();
    switch (searchOption) {
      case 'title':
        await searchByTitle();
        break;
      case 'content':
        await searchByContent();
        break;
      default:
        break;
    }
  };

  if (isPending || isError) return <Loading isPending={isPending} isError={isError} />;
  return (
    <div className='sm:mr-[40px]'>
      <div className='flex flex-row'>
        <CenterSearch
          searchOption={searchOption}
          setSearchOption={setSearchOption}
          search={search}
          setSearch={setSearch}
          onClickSearch={onClickSearch}
        />
        <Link
          href={`${isLogin ? '/content/center/write' : '/login'}`}
          className='ml-auto flex h-[44px] w-[100px] items-center justify-center gap-2 rounded-lg bg-pink-400 text-sm font-bold text-white transition-all hover:bg-pink-500'
        >
          <PencilIcon color='white' size={18} />
          Q&A
        </Link>
      </div>
      <ul>
        {posts.content.map((data) => (
          <li key={data.postId} className='flex w-full flex-col gap-4'>
            <WriterView writer={data.nickname} date={data.createAt} />
            <div className='relative flex flex-row items-center gap-2 font-semibold'>
              <Link href={`/content/community/${data.postId}`}>{data.title}</Link>
              {answer ? (
                <div className='absolute right-0 flex cursor-pointer items-center gap-2 rounded-lg bg-pink-400 p-1 text-white'>
                  <TbMessageCircleQuestion size={20} /> 답변완료
                </div>
              ) : (
                <div className='absolute right-0 flex cursor-pointer items-center gap-2 rounded-lg bg-pink-400 p-1 text-white'>
                  <TbMessageCircleQuestion size={20} /> 답변대기
                </div>
              )}
            </div>
            <div className='mb-4 w-full border border-gray-200' />
          </li>
        ))}
      </ul>

      <div className='flex justify-around'>
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
