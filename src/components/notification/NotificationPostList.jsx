'use client';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import {
  noticePostIdState,
  postCategoryNameState,
  postContentState,
  postEditModeState,
  postHashtagState,
  postTitleState,
} from '@/atoms/PostState';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useParams, useRouter } from 'next/navigation';
import { tokenState } from '@/atoms/tokenState';
import { toast } from 'react-toastify';
import Loading from '../Loading';

export default function NotificationPostList({ admin }) {
  dayjs.extend(relativeTime);
  dayjs.locale('ko');
  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useParams();
  const token = useRecoilValue(tokenState);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 (1부터 시작)
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const [postsPerPage, setPostsPerPage] = useState(10); // 페이지당 게시글 개수
  const [totalItems, setTotalItems] = useState(0);
  const setPostEditMode = useSetRecoilState(postEditModeState);
  const setPostTitle = useSetRecoilState(postTitleState);
  const setPostCategoryName = useSetRecoilState(postCategoryNameState);
  const setPostContent = useSetRecoilState(postContentState);
  const setPostHashtag = useSetRecoilState(postHashtagState);
  const setNoticePostId = useSetRecoilState(noticePostIdState);

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

  const onClickPostEdit = async (title, category, content, noticeId) => {
    setPostEditMode(true);
    setPostTitle(title);
    setPostCategoryName(category);
    setPostContent(content);
    setNoticePostId(noticeId);
    router.push(`/manager/notifications/${noticeId}/edit`);
  };

  const onClickDelete = async (noticeId) => {
    try {
      const res = await axios.delete(`/api/admin/notice/${noticeId}`, {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200) {
        queryClient.invalidateQueries(['post', params.id]);
        toast.success('공지사항이 삭제되었습니다.');
      }
    } catch (error) {
      toast.error('댓글 삭제 중 오류가 발생했습니다.');
    }
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
            <div className='text-md relative flex items-center gap-4 pl-4 font-semibold'>
              {admin && (
                <>
                  <button
                    href={`/content/notice/${data.noticeId}`}
                    className='rounded-md bg-pink-200 p-2 transition-all hover:bg-pink-500'
                    onClick={() => onClickPostEdit(data.title, data.postCategory, data.content, data.noticeId)}
                  >
                    수정
                  </button>
                  <button
                    onClick={() => onClickDelete(data.noticeId)}
                    className='rounded-md bg-pink-200 p-2 transition-all hover:bg-pink-500'
                  >
                    삭제
                  </button>
                </>
              )}
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
