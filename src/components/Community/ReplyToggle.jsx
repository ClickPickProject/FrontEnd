'use client';
import { useState } from 'react';
import WriterView from './BestPost/WriterView';
import { useRecoilValue } from 'recoil';
import { MyNicknameState, tokenState } from '@/atoms/tokenState';

export default function ReplyToggle({ commentNickname, onSubmitReply }) {
  const [reply, setReply] = useState('');
  const myNickname = useRecoilValue(MyNicknameState);
  const token = useRecoilValue(tokenState);

  const handleReplyChange = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
    setReply(e.target.value);
  };

  const onClickReplyWrite = async () => {
    const mentionedWriter = `@${commentNickname}`; // 작성자의 닉네임을 멘션
    const fullReplyContent = `${mentionedWriter} ${reply}`;
    onSubmitReply(fullReplyContent);
    setReply('');
  };

  return (
    <div className='mb-5 ml-4 h-full w-full rounded-lg border-2 border-pink-200 pl-2 focus:border-pink-500'>
      <div className='mt-2'>
        <WriterView writer={myNickname} />
      </div>
      <textarea
        placeholder={token ? '답글을 입력하세요' : '로그인 후 이용해주세요'}
        disabled={token ? false : true}
        className='flex w-full resize-none flex-wrap overflow-hidden rounded-lg py-2 outline-none disabled:bg-white'
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
