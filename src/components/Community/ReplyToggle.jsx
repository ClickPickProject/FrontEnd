'use client';
import { useState } from 'react';
import WriterView from './BestPost/WriterView';
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function ReplyToggle({ commentId, onSubmitReply }) {
  const [reply, setReply] = useState('');

  const handleReplyChange = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
    setReply(e.target.value);
  };

  const onClickReplyWrite = async () => {
    console.log('onClickReplytWrite');
    onSubmitReply(reply);

    setReply('');
  };

  return (
    <div className='mb-5 ml-4 h-full w-full rounded-lg border-2 border-pink-200 pl-2 focus:border-pink-500'>
      <div className='mt-2'>
        <WriterView writer={'답글작성자'} />
      </div>
      <textarea
        placeholder='답글을 입력하세요'
        className='flex w-full resize-none flex-wrap overflow-hidden rounded-lg py-2 outline-none'
        value={reply}
        onChange={handleReplyChange}
      />
      <div className='m-2 flex w-[54px] cursor-pointer justify-center rounded-md bg-pink-300 py-1 text-sm transition-all hover:bg-pink-400 hover:text-white'>
        <button className='h-full w-full' onClick={onClickReplyWrite}>
          등록
        </button>
      </div>
    </div>
  );
}
