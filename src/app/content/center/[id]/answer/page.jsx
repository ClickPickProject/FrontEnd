'use client';
import { editorContentState, editorTagState, editorTitleState, postImagesState } from '@/atoms/editorContentState';
import { tokenState } from '@/atoms/tokenState';
import AuthContext from '@/components/context/AuthContext';
import axios from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageState } from '@/atoms/pageState';
import CenterCustomEditor from '@/components/UI/CenterCustomEditor';
import { toast } from 'react-toastify';
import { axiosInstance } from '@/components/utils/Axios';

function WritePage() {
  const router = useRouter();
  const [title, setTitle] = useRecoilState(editorTitleState);
  const content = useRecoilValue(editorContentState);
  const token = useRecoilValue(tokenState);

  const url = useRecoilValue(pageState);
  useEffect(() => {
    setTitle('');
  }, [setTitle]);
  const onClickWriteSubmit = async (e) => {
    e.preventDefault();
    if (title.length === 0 || content.length === 0) {
      toast.success(`제목 또는 내용이 존재하지 않습니다.`, {
        position: 'top-right',
      });
      return;
    }
    try {
      const body = {
        title,
        content,
      };
      const res = await axiosInstance.post(url, body, {
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200 || 201) {
        toast.success(`답변을 등록하였습니다.`, {
          position: 'top-right',
        });
        router.back();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className='w-full'>
        <div className='p-4 text-2xl font-bold'>답변</div>
        <div className='mx-4 flex flex-col gap-4'>
          <span className='flex'>
            <input
              placeholder='답변을 입력하세요'
              className='h-12 w-full rounded-lg border pl-2 text-xl outline-none'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </span>
          {/* 에디터 */}
          <div className='h-[full] w-[full]'>{<CenterCustomEditor />}</div>
          <div className='mx-auto mt-4 flex h-10 w-1/6 cursor-pointer items-center justify-center rounded-lg bg-pink-300 font-semibold shadow-md transition-all hover:bg-pink-400'>
            <button onClick={onClickWriteSubmit} className='h-full w-full'>
              제출
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthContext(WritePage, { adminRequired: false });
