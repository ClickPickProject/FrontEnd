'use client';
import { editorContentState, editorTagState, editorTitleState } from '@/atoms/editorContentState';
import Hashtag from '@/components/Community/Hashtag';
import CustomEditor from '@/components/CustomEditor';
import DropDownMenu from '@/components/UI/DropDownMenu';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function WritePage() {
  const [title, setTitle] = useRecoilState(editorTitleState);
  const content = useRecoilValue(editorContentState);
  const tag = useRecoilValue(editorTagState);
  const router = useRouter();
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
        userId: 'please@naver.com',
        title,
        content,
        position: '',
        hashtag: tag,
        date: new Date(),
        viewCount: 0,
        likeCount: 0,
      };
      const res = await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_API_URL}/posts`, body);
      // const res = await axios.post(`/api/post`, body, {
      //   withCredentials: true,
      // });
      console.log(res);
      if (res.status === 200 || 201) {
        alert('게시글이 등록되었습니다.');
        router.back();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <div className='p-4 text-2xl font-bold'>글 작성</div>
        <div className='flex flex-col'>
          <DropDownMenu />
          <input
            placeholder='제목을 입력해주세요'
            className='h-12 pl-2 text-2xl outline-none'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          {/* 에디터 */}
          <div className='h-[full] w-[full]'>
            <CustomEditor />
          </div>
          {/* 해시태그 */}
          <Hashtag />
          <div className='mx-auto mt-4 flex h-10 w-1/6 cursor-pointer items-center justify-center rounded-lg bg-pink-300 font-semibold shadow-md transition-all hover:bg-pink-400 '>
            <button onClick={onClickWriteSubmit} className='h-full w-full'>
              제출
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
