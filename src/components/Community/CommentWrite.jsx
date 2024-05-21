'use client';
import { useState } from 'react';
import WriterView from './BestPost/WriterView';
import { useParams } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { MyNicknameState, tokenState } from '@/atoms/tokenState';
import { useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../utils/Axios';
import { toast } from 'react-toastify';
import { userImgState } from '@/atoms/userInfoState';

export default function CommentWrite() {
  const params = useParams();
  const [comment, setComment] = useState('');
  const token = useRecoilValue(tokenState);
  const myNickname = useRecoilValue(MyNicknameState);
  const queryClient = useQueryClient();
  const image = useRecoilValue(userImgState);

  const handleTextareaChange = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
    setComment(e.target.value);
  };

  const onClickComment = async () => {
    const body = {
      postId: params.id,
      content: comment,
    };
    try {
      const res = await axiosInstance.post('/api/member/comment', body, {
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200) {
        queryClient.invalidateQueries(['posts', params.id]);
        setComment('');
      }
    } catch (err) {
      toast.error('댓글 작성 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className='mt-5 h-auto'>
      <div className='grid h-full w-full rounded-lg border-2 border-pink-200 pl-2 focus:border-pink-500'>
        <div className='mt-2'>
          <WriterView writer={myNickname} profile={ProfileImage} />
        </div>
        <textarea
          placeholder={token ? '댓글을 입력하세요' : '로그인 후 이용해주세요'}
          disabled={token ? false : true}
          className='overlfow-hidden flex w-full resize-none flex-wrap rounded-lg py-2 outline-none disabled:bg-white'
          value={comment}
          onChange={handleTextareaChange}
        />
        <div className='m-2 flex w-[54px] cursor-pointer justify-center rounded-md bg-pink-300 py-1 text-sm transition-all hover:bg-pink-400 hover:text-white'>
          <button className='h-full w-full' onClick={onClickComment}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
}
