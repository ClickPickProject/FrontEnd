'use client';
import WriterView from '../BestPost/WriterView';
import { EmptyHeartIcon, FillHeartIcon, ReplyIcon } from '../../UI/Icons';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { pageState } from '@/atoms/pageState';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { MyNicknameState, tokenState } from '@/atoms/tokenState';
import { parentCommentIdState } from '@/atoms/commentState';

export default function CenterReplyComments({ reply, onClickCommentDelete, onClickEdit, onClickReply }) {
  const myNickname = useRecoilValue(MyNicknameState);
  const token = useRecoilValue(tokenState);
  const [pageState1, setPageState1] = useRecoilState(pageState);
  const router = useRouter();
  useEffect(() => {
    console.log(reply.questionId);
  }, []);
  return (
    <>
      <li key={reply.answerId} className='flex flex-col gap-4'>
        <WriterView writer={reply.nickname} date={reply.createAt} profile={reply.profileUrl} />

        <h2 className='font-semibold'> {reply.title}</h2>

        <div className='flex flex-col gap-1 rounded-md'>
          <div dangerouslySetInnerHTML={{ __html: reply.content }} />
        </div>
        {/* 답글 버튼 */}
        <div className='flex items-center gap-1'>
          <div
            className={`flex cursor-pointer items-center gap-1 opacity-50 transition-all hover:opacity-100`}
            onClick={() => onClickReply(reply.questionId, reply.answerId)}
          >
            <ReplyIcon color='#ec4899' />

            <div className={`cursor-pointer text-sm font-semibold hover:opacity-100`}>답글</div>
          </div>
          {/* 댓글 수정 및 삭제 */}
          {reply.nickname === myNickname ? (
            <button
              className='text-sm font-semibold opacity-50 transition-all hover:opacity-100'
              onClick={() => onClickEdit(reply.answerId)}
            >
              {reply.commentStatus === 'DELETE' ? null : '수정'}
            </button>
          ) : null}
          {reply.nickname === myNickname ? (
            <button
              onClick={() => onClickCommentDelete(reply.answerId)}
              className='text-sm font-semibold opacity-50 transition-all hover:opacity-100'
            >
              {reply.commentStatus === 'DELETE' ? null : '삭제'}
            </button>
          ) : null}
          <div className='my-2 border' />
        </div>
        {/* 답글 목록 */}
        <div className='ml-5'>
          <div className='my-2 flex w-full border-b-2 ' />
          {reply.reAnswer.map((reply) => (
            <CenterReplyComments
              key={reply.answerId}
              reply={reply}
              onClickCommentDelete={onClickCommentDelete}
              onClickEdit={onClickEdit}
              onClickReply={onClickReply}
            />
          ))}
        </div>
      </li>
    </>
  );
}
