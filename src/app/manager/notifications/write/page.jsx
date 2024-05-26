'use client';
import CustomEditor from '@/components/CustomEditor';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useEffect, useState } from 'react';
import { editorContentState } from '@/atoms/editorContentState';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import ReqRefreshToken from '@/components/utils/ReqRefreshToken';
import { axiosInstance } from '@/components/utils/Axios';
import { tokenState } from '@/atoms/tokenState';

export default function NoticeWritePage() {
  const [content, setContent] = useRecoilState(editorContentState);
  const [noticeTitle, setNoticeTitle] = useState('');
  const token = useRecoilValue(tokenState);
  const router = useRouter();
  useEffect(() => {
    setNoticeTitle('');
    setContent('');
  }, []);
  const onClickNotificationsSubmit = async (noticeTitle, content) => {
    if (noticeTitle.length === 0 || content.length === 0) {
      toast.error('제목 또는 내용이 존재하지 않습니다.', {
        position: 'top-right',
      });
      return;
    }
    try {
      const body = { title: noticeTitle, content };
      const res = await axiosInstance.post('/api/admin/notice', body, {
        headers: {
          Authorization: token,
        },
      });

      if (res.status === 200) {
        toast.success('공지사항이 등록되었습니다.');
        setNoticeTitle('');
        setContent('');
        router.back();
      }
    } catch (error) {
      if (error.response.status === 406) {
        await ReqRefreshToken();
        toast.error('권한이 없습니다.');
        return;
      }
      toast.error('공지사항 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };
  dayjs.extend(relativeTime);
  dayjs.locale('ko');

  return (
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
              onClick={() => onClickNotificationsSubmit(noticeTitle, content)}
            >
              작성
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
