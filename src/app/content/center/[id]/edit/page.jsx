'use client';
import { postCategoryNameState, postTitleState } from '@/atoms/PostState';
import { editorContentState, editorTagState, editorTitleState, postImagesState } from '@/atoms/editorContentState';
import { tokenState } from '@/atoms/tokenState';
import CenterCustomEditor from '@/components/UI/CenterCustomEditor';
import AuthContext from '@/components/context/AuthContext';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageState } from '@/atoms/pageState';
import { toast } from 'react-toastify';

function CenterEditPage() {
  const [title, setTitle] = useRecoilState(editorTitleState);
  const [category, setCategory] = useState('');
  const content = useRecoilValue(editorContentState);
  const url = useRecoilValue(pageState);

  const router = useRouter();
  const token = useRecoilValue(tokenState);
  const postTitle = useRecoilValue(postTitleState);
  const postCategory = useRecoilValue(postCategoryNameState);
  const queryClient = useQueryClient();
  const params = useParams();
  const [postOpen, setPostOpen] = useState(false);
  const [lock, setLock] = useState('LOCKED');
  useEffect(() => {
    setTitle(postTitle);
    setCategory(postCategory);
  }, []);
  const postOpenButtonClick = (e) => {
    e.preventDefault();
    setPostOpen((open) => !open);
    setLock(postOpen ? 'LOCKED' : 'UNLOCK');
    console.log(lock);
  };
  const onClickWriteSubmit = async (e) => {
    e.preventDefault();
    console.log(url);
    if (title.length === 0 || content.length === 0) {
      toast.error(`제목 또는 내용이 존재하지 않습니다.`, {
        position: 'top-right',
      });
      return;
    }
    try {
      const body = {
        title,
        content,
        lock,
      };
      const res = await axios.post(url, body, {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200) {
        toast.success('게시글이 수정되었습니다.');
        queryClient.invalidateQueries(['post', params.id]);
        router.back();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className='w-full'>
        <div className='p-4 text-2xl font-bold'>글 수정</div>
        <div className='mx-4 flex flex-col gap-4'>
          <span className='flex'>
            <input
              placeholder='제목을 입력하세요'
              className='h-12 w-full rounded-lg border pl-2 text-xl outline-none'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />

            <button
              onClick={postOpenButtonClick}
              className='ml-2 h-12 w-[80px] items-center justify-center rounded-lg border bg-pink-300 font-semibold shadow-md transition-all hover:bg-pink-400'
            >
              {postOpen ? '공개' : '비공개'}
            </button>
          </span>
          {/* 에디터 */}
          <div className='h-[full] w-[full]'>
            <CenterCustomEditor editMode />
          </div>
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

export default AuthContext(CenterEditPage, { adminRequired: false });
