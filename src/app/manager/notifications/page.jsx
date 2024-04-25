'use client';
import { editorContentState } from '@/atoms/editorContentState';
import CustomEditor from '@/components/CustomEditor';
import NoticePostList from '@/components/NoticePostList';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function NotificationsPage() {
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
        alert('공지사항이 성공적으로 등록되었습니다.');
        setNoticeTitle('');
        setContent('');
        router.back();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className='flex h-full items-center'>
        <div className='mx-auto flex w-[1200px] flex-col rounded-lg bg-white shadow-md'>
          <div className='bg-pink-200 px-6 py-4 text-lg font-semibold text-gray-800'>공지사항 작성</div>
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
    </>
  );
}
