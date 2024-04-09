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
import { loginState } from '@/atoms/tokenState';
import { useRecoilValue } from 'recoil';
import { PencilIcon } from './UI/Icons';
import CenterSearch from './CenterSearch';
import { tokenState } from '@/atoms/tokenState';
export default function NoticePostList({ url }) {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 (1부터 시작)
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const [postsPerPage, setPostsPerPage] = useState(10); // 페이지당 게시글 개수
  const [totalItems, setTotalItems] = useState(0);
  const isLogin = useRecoilValue(loginState);
  const [searchOption, setSearchOption] = useState('title'); // 검색 옵션 (기본값: 제목검색)
  const [search, setSearch] = useState(''); // 검색어
  const [searchResults, setSearchResults] = useState(null); // 검색 결과
  const [selectedStatus, setSelectedStatus] = useState('모두');
  const [answer, setAnswer] = useState('false');
  const [statusValue, setStatusValue] = useState('');

  const token = useRecoilValue(tokenState);
  // /api/member/question
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStatus]);
  const {
    data: posts,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['posts', currentPage],
    queryFn: async () => {
      const res = await axios.get(url, {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
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
  // 카테고리 필터링
  const filteredPosts = posts?.content?.filter((post) => {
    if (selectedStatus === '모두') {
      return true; // 모든 포스트를 반환
    } else {
      return post.status === selectedStatus; // 선택된 상태와 일치하는 포스트만 반환
    }
  });

  const displayPosts = filteredPosts;
  //NoticePostList
  if (isPending || isError) return <Loading isPending={isPending} isError={isError} />;
  return (
    <div className='sm:mr-[40px]'>
      <div className='flex flex-row'>
        {/* <CenterSearch
          searchOption={searchOption}
          setSearchOption={setSearchOption}
          search={search}
          setSearch={setSearch}
          onClickSearch={onClickSearch}
        /> */}
        <Link
          href={{
            pathname: isLogin ? '/content/center/write' : '/login',
            query: { urlProp: '/api/member/question' },
          }}
          passHref
          className='ml-auto flex h-[44px] w-[100px] items-center justify-center gap-2 rounded-lg bg-pink-400 text-sm font-bold text-white transition-all hover:bg-pink-500'
        >
          <PencilIcon color='white' size={18} />
          Q&A
        </Link>
      </div>
      <div className='float-right'>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className='rounded-lg bg-pink-200 px-2 py-1 font-semibold outline-none transition-all hover:cursor-pointer hover:bg-pink-300 sm:px-1.5 sm:text-xs'
        >
          <option value='모두'>모두</option>
          <option value='COMPLETE'>답변대기</option>
          <option value='AWAITING'>답변완료</option>
        </select>
      </div>
      <ul>
        {displayPosts?.map((data) => (
          <li key={data.questionId} className='flex w-full flex-col gap-4'>
            <WriterView writer={data.nickname} date={data.createAt} />
            <div className='relative flex flex-row items-center gap-2 font-semibold'>
              <Link href={`/content/center/${data.questionId}`}>{data.title}</Link>
              <div className='absolute right-0 flex gap-4'>
                <div
                  className={`flex cursor-pointer items-center gap-2 rounded-lg ${data.status !== 'COMPLETE' ? `bg-pink-600` : `bg-pink-400`} p-1.5 text-white`}
                >
                  <TbMessageCircleQuestion size={20} /> 답변대기
                </div>
                <div
                  className={`flex cursor-pointer items-center gap-2 rounded-lg ${data.status === 'COMPLETE' ? `bg-pink-600` : `bg-pink-400`} p-1.5 text-white`}
                >
                  <TbMessageCircleQuestion size={20} /> 답변완료
                </div>
              </div>
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
