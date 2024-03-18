'use client';
import { useState } from 'react';
import WriterView from './BestPost/WriterView';

export default function CommentWrite() {
  const [comment, setComment] = useState('');

  const handleTextareaChange = (e) => {
    const { target } = e;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
    setComment(target.value);
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
          <button className='h-full w-full'>등록</button>
        </div>
      </div>
    </div>
  );
}
