'use client';
import { useState } from 'react';
import WriterView from './BestPost/WriterView';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { tokenState } from '@/atoms/tokenState';
import { commentsState } from '@/atoms/PostState';

export default function CommentWrite() {
  const params = useParams();
  const setComments = useSetRecoilState(commentsState);
  const [comment, setComment] = useState('');
  const token = useRecoilValue(tokenState);

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
      const res = await axios.post('/api/member/comment', body, {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200) {
        commentsUpdate();
        setComment('');
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const commentsUpdate = async () => {
    try {
      const res = await axios.get(`/api/post/${params.id}`, {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200) {
        setComments(res.data.comments);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='h-auto'>
      <div className='grid h-full w-full rounded-lg border-2 border-pink-200 pl-2 focus:border-pink-500'>
        <div className='mt-2'>
          <WriterView writer={'댓글작성자'} />
        </div>
        <textarea
          placeholder='댓글을 입력하세요'
          className='overlfow-hidden flex w-full resize-none flex-wrap rounded-lg py-2 outline-none'
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
