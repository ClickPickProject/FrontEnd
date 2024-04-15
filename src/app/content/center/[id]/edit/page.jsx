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

function CenterEditPage() {
  const [title, setTitle] = useRecoilState(editorTitleState);
  const [category, setCategory] = useState('');
  const content = useRecoilValue(editorContentState);
  const router = useRouter();
  const token = useRecoilValue(tokenState);
  const postTitle = useRecoilValue(postTitleState);
  const postCategory = useRecoilValue(postCategoryNameState);
  const queryClient = useQueryClient();
  const params = useParams();
  const [postOpen, setPostOpen] = useState(false);
  let lock;
  useEffect(() => {
    setTitle(postTitle);
    setCategory(postCategory);
  }, []);
  const postOpenButtonClick = (e) => {
    e.preventDefault();
    setPostOpen((open) => !open);
    let lock = { lock: postOpen ? 'LOCKED' : 'UNLOCK' };
  };
  const onClickWriteSubmit = async (e) => {
    e.preventDefault();
    if (title.length === 0 || content.length === 0 || category === '') {
      alert('제목 또는 내용, 카테고리가 존재하지 않습니다.');
      return;
    }
    try {
      const body = {
        title,
        content,
        lock,
      };
      const res = await axios.post(`/api/member/question/${params.id}`, body, {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200) {
        alert('게시글이 수정되었습니다.');
        queryClient.invalidateQueries(['post', params.id]);
        router.back();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <div className='p-4 text-2xl font-bold'>글 수정</div>
        <div className='flex flex-col gap-4'>
          <input
            placeholder='제목을 입력하세요'
            className='h-12 rounded-lg border pl-2 text-xl outline-none'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <button
            onClick={postOpenButtonClick}
            className='ml-2 h-12 w-[80px] items-center justify-center rounded-lg border bg-pink-300 font-semibold shadow-md transition-all hover:bg-pink-400'
          >
            {postOpen ? '공개' : '비공개'}
          </button>
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

export default AuthContext(EditPage, { adminRequired: false });
