'use client';
import { editorContentState, editorTagState, editorTitleState, postImagesState } from '@/atoms/editorContentState';
import { tokenState } from '@/atoms/tokenState';
import CustomEditor from '@/components/CustomEditor';
import AuthContext from '@/components/context/AuthContext';
import axios from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageState } from '@/atoms/pageState';

function WritePage() {
  const router = useRouter();
  const [title, setTitle] = useRecoilState(editorTitleState);
  const content = useRecoilValue(editorContentState);
  const tag = useRecoilValue(editorTagState);
  const token = useRecoilValue(tokenState);
  const url = useRecoilValue(pageState);
  const [postImages, setPostImages] = useRecoilState(postImagesState);
  useEffect(() => {
    setTitle('');
  }, [setTitle]);
  const onClickWriteSubmit = async (e) => {
    e.preventDefault();
    if (title.length === 0 || content.length === 0) {
      alert('제목 또는 내용이 존재하지 않습니다.');
      return;
    }
    try {
      const body = {
        title,
        content,
        hashtags: tag,
        imageNames: postImages,
      };
      const res = await axios.post(url, body, {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200 || 201) {
        alert('질문을 등록 하였습니다.');
        router.back();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <div className='p-4 text-2xl font-bold'>Q&A 작성</div>
        <div className='flex flex-col gap-4'>
          <input
            placeholder='질문을 입력하세요'
            className='h-12 rounded-lg border pl-2 text-xl outline-none'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          {/* 에디터 */}
          <div className='h-[full] w-[full]'>
            <CustomEditor />
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

export default AuthContext(WritePage, { adminRequired: false });
