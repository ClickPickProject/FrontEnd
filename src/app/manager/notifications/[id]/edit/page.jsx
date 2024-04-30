'use client';
import CustomEditor from '@/components/CustomEditor';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useEffect, useState } from 'react';
import { editorContentState } from '@/atoms/editorContentState';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function NoticeEditPage() {
  const [content, setContent] = useRecoilState(editorContentState);
  const [noticeTitle, setNoticeTitle] = useState('');
  const router = useRouter();
  useEffect(() => {
    setNoticeTitle('');
    setContent('');
  }, []);
  const onClickNotificationsSubmit = async () => {
    try {
      const res = await axios.post('/api/admin/notice', {
        title: noticeTitle,
        content,
      });
      if (res.status === 200) {
        toast.success('공지사항이 수정되었습니다.');
        setNoticeTitle('');
        setContent('');
        router.back();
      }
    } catch (error) {
      toast.error('공지사항 수정에 실패했습니다. 다시 시도해주세요.');
    }
  };
  dayjs.extend(relativeTime);
  dayjs.locale('ko');
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 (1부터 시작)
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const [postsPerPage, setPostsPerPage] = useState(10); // 페이지당 게시글 개수
  const [totalItems, setTotalItems] = useState(0);
  return (
    <div className='flex h-full items-center'>
      <div className='mx-auto flex w-[1200px] flex-col rounded-lg bg-white shadow-md'>
        <div className='bg-pink-200 px-6 py-4 text-lg font-semibold text-gray-800'>공지사항 수정</div>
        <div className='p-6'>
          <div className='mb-6'>
            <label className='mb-2 text-sm font-bold text-gray-700' htmlFor='title'>
              제목
            </label>
            <input
              className='focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none'
              id='title'
              type='text'
              placeholder='제목을 입력하세요...'
              onChange={(e) => setNoticeTitle(e.target.value)}
              value={noticeTitle}
            />
          </div>
          <CustomEditor />
          <div className='mt-4 flex justify-end'>
            <button
              className='focus:shadow-outline rounded bg-pink-500 px-4 py-2 font-bold text-white transition-all hover:bg-pink-700 focus:outline-none'
              type='button'
              onClick={onClickNotificationsSubmit}
            >
              작성
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
