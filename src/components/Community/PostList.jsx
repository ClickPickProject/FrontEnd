'use client';
import Link from 'next/link';
import StatusView from './BestPost/StatusView';
import WriterView from './BestPost/WriterView';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from 'react-js-pagination';

export default function PostList({ category }) {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 (1부터 시작)
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const [postsPerPage, setPostsPerPage] = useState(10); // 페이지당 게시글 개수
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(category);

  useEffect(() => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setTotalItems(filteredPosts);
  }, [category]);

  useEffect(() => {
    const postListFetch = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/post/list`, {
          params: {
            page: currentPage - 1, // 페이지 번호가 0부터 시작하므로 -1
          },
        });
        if (res.status === 200) {
          setPosts(res.data.content);
          setTotalPages(res.data.totalPages);
          setTotalItems(res.data.totalElements);
          setPostsPerPage(res.data.size);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    postListFetch();
  }, [currentPage, postsPerPage, selectedCategory]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredPosts = posts.filter((post) => {
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

  return (
    <div className=''>
      {loading ? (
        '로딩중...'
      ) : (
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
      )}
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
