'use client';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import StatusView from './BestPost/StatusView';
import WriterView from './BestPost/WriterView';
import Pagination from 'react-js-pagination';
import Loading from '../Loading';
import Search from '../Search';
import { tokenState } from '@/atoms/tokenState';
import { useRecoilValue } from 'recoil';
import { axiosInstance } from '../utils/Axios';
import { toast } from 'react-toastify';
import ReqRefreshToken from '../utils/ReqRefreshToken';

export default function PostList({ category }) {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 (1부터 시작)
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const [postsPerPage, setPostsPerPage] = useState(10); // 페이지당 게시글 개수
  const [totalItems, setTotalItems] = useState(0); // 모든 게시글 수
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [searchOption, setSearchOption] = useState('title'); // 검색 옵션 (기본값: 제목검색)
  const [search, setSearch] = useState(''); // 검색어
  const [searchResults, setSearchResults] = useState(null); // 검색 결과
  const token = useRecoilValue(tokenState);
  const [filteredCategoryPosts, setFilteredCategoryPosts] = useState(null);

  useEffect(() => {
    ReqRefreshToken();
  }, []);

  useEffect(() => {
    setSelectedCategory(category);
    setCurrentPage(1);
  }, [category]);

  useEffect(() => {
    if (selectedCategory !== '모두' || selectedCategory !== '') {
      categorySearch(selectedCategory);
    }
  }, [selectedCategory]);

  const {
    data: posts,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['posts', selectedCategory, currentPage],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/post/list', {
        params: {
          page: currentPage - 1,
          category: selectedCategory !== '모두' ? selectedCategory : null,
        },
      });
      if (res.status === 200) {
        setTotalPages(res.data.totalPages);
        setTotalItems(res.data.totalElements);
        setPostsPerPage(res.data.size);
      }
      return res.data;
    },
    keepPreviousData: true,
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (!category === '모두') {
      categorySearch(selectedCategory);
    }
    refetch();
  };

  const categorySearch = async (category) => {
    if (category === '모두') {
      return;
    }
    try {
      const res = await axiosInstance.get('/api/post/category', {
        params: {
          page: currentPage - 1,
          category: category === '모두' ? null : category,
        },
      });
      if (res.status === 200) {
        setFilteredCategoryPosts(res.data.content);
        setCurrentPage(1);
        setTotalPages(res.data.totalPages);
        setTotalItems(res.data.totalElements);
        setPostsPerPage(res.data.size);
      }
    } catch (err) {
      // toast.error('카테고리 선택 중 오류가 발생했습니다.');
    }
  };

  const filteredPosts = selectedCategory && selectedCategory !== '모두' ? filteredCategoryPosts : posts?.content;

  const displayPosts = searchResults || filteredPosts;
  if (isPending || isError) return <Loading isPending={isPending} isError={isError} />;

  const handleSearchResults = (res) => {
    if (res.status === 200) {
      setSearchResults(res.data.content);
      setTotalPages(res.data.totalPages);
      setTotalItems(res.data.totalElements);
      setCurrentPage(1);
    }
  };

  const searchByTitle = async () => {
    try {
      const res = await axiosInstance.get('/api/post/title', {
        params: {
          title: search,
        },
      });
      handleSearchResults(res);
    } catch (err) {
      toast.error('제목 검색 중 오류가 발생했습니다.');
    }
  };

  const searchByContent = async () => {
    try {
      const res = await axiosInstance.get('/api/post/content', {
        params: {
          content: search,
        },
      });
      handleSearchResults(res);
    } catch (err) {
      toast.error('내용 검색 중 오류가 발생했습니다.');
    }
  };

  const searchByHashtag = async () => {
    try {
      const res = await axiosInstance.get('/api/post/hashtag', {
        params: {
          hashtag: search,
        },
      });
      handleSearchResults(res);
    } catch (err) {
      toast.error('해시태그 검색 중 오류가 발생했습니다.');
    }
  };

  const onClickSearch = async (e) => {
    e.preventDefault();
    switch (searchOption) {
      case 'title':
        await searchByTitle();
        break;
      case 'content':
        await searchByContent();
        break;
      case 'hashtag':
        await searchByHashtag();
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Search
        searchOption={searchOption}
        setSearchOption={setSearchOption}
        search={search}
        setSearch={setSearch}
        onClickSearch={onClickSearch}
      />
      <ul className='sm:px-8'>
        {displayPosts?.map((data) => (
          <li key={data.postId} className='flex w-full flex-col gap-4'>
            <WriterView writer={data.nickname} date={data.createAt} profile={data.profileUrl} />
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
