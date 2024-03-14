'use client';
import { editorContentState, editorTagState, editorTitleState } from '@/atoms/editorContentState';
import { tokenState } from '@/atoms/tokenState';
import Hashtag from '@/components/Community/Hashtag';
import CustomEditor from '@/components/CustomEditor';
import Postcode from '@/components/Postcode';
import DropDownMenu from '@/components/UI/DropDownMenu';
import AuthContext from '@/components/context/AuthContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

function WritePage() {
  const [title, setTitle] = useRecoilState(editorTitleState);
  const [category, setCategory] = useState('');
  const [position, setPostion] = useState('');
  const content = useRecoilValue(editorContentState);
  const tag = useRecoilValue(editorTagState);
  const router = useRouter();
  const token = useRecoilValue(tokenState);
  useEffect(() => {
    setTitle('');
  }, [setTitle]);
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
        position,
        hashtags: tag,
        postCategory: category,
      };
      const res = await axios.post(`/api/member/post`, body, {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200 || 201) {
        alert('게시글이 등록되었습니다.');
        router.back();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleMenuClick = (item) => {
    setCategory(item);
  };

  const handlePostCodeClick = (address) => {
    setPostion(address);
  };
  return (
    <>
      <div>
        <div className='p-4 text-2xl font-bold'>글 작성</div>
        <div className='flex flex-col gap-4'>
          <div className='flex justify-around gap-3'>
            <DropDownMenu onChange={handleMenuClick} />
            <Postcode onChange={handlePostCodeClick} />
          </div>

          <input
            placeholder='제목을 입력하세요'
            className='h-12 rounded-lg border pl-2 text-xl outline-none'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          {/* 에디터 */}
          <div className='h-[full] w-[full]'>
            <CustomEditor />
          </div>
          {/* 해시태그 */}
          <Hashtag />
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
