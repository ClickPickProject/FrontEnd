import WriterView from './BestPost/WriterView';
import { ReplyIcon } from '../UI/Icons';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { tokenState } from '@/atoms/tokenState';
import { useRecoilValue } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';

export default function ReplyComments({ reply }) {
  const [replyComment, setReplyComment] = useState('');
  const [replyToggle, setReplyToggle] = useState(Array(reply.length).fill(false));
  const [parentCommentId, setParentCommentId] = useState('');
  const token = useRecoilValue(tokenState);
  const params = useParams();
  const queryClient = useQueryClient();

  const handleReplyChange = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
    setReplyComment(e.target.value);
  };

  const onClickReply = (commentId) => {
    setReplyToggle((prevToggles) => {
      const newToggles = [...prevToggles];
      newToggles.fill(false);
      newToggles[commentId] = !prevToggles[commentId];
      console.log(commentId);
      return newToggles;
    });
    setParentCommentId(commentId);
  };

  const onClickReplyWrite = async () => {
    const body = {
      parentCommentId: parentCommentId,
      postId: params.id,
      content: reply,
    };
    try {
      const res = await axios.post('/api/member/recomment', body, {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200) {
        // commentsUpdate();
        queryClient.invalidateQueries(['comments', params.id]);
        queryClient.invalidateQueries(['post', params.id]);
        setReplyComment('');
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <>
      <div className='flex flex-col gap-2'>
        <WriterView writer={reply.nickname} date={reply.createAt} />
        <div>{reply.content}</div>
        <div className='flex items-center gap-1'>
          <ReplyIcon color='red' opacity='70%' />
          <div className='text-sm font-semibold opacity-50'>신고</div>
          <div
            className={`flex cursor-pointer items-center gap-1 opacity-50 transition-all hover:opacity-100`}
            onClick={() => onClickReply(reply.commentId)}
          >
            <ReplyIcon color='#ec4899' />
            <div className={`cursor-pointer text-sm font-semibold hover:opacity-100`}>답글 일세 {reply.commentId}</div>
          </div>
          {reply.nickname === '올빼미' ? <div className='text-sm font-semibold opacity-50'>삭제</div> : null}
        </div>
        <div className='my-2 border' />

        {/* 답글 토글 */}
        {replyToggle[reply.commentId] && (
          <div className='mb-5 ml-4 h-full w-full rounded-lg border-2 border-pink-200 pl-2 focus:border-pink-500'>
            <div className='mt-2'>
              <WriterView writer={'답글작성자'} />
            </div>
            <textarea
              placeholder='답글을 입력하세요'
              className='overlfow-hidden flex w-full resize-none flex-wrap rounded-lg py-2 outline-none'
              value={reply}
              onChange={handleReplyChange}
            />
            <div className='m-2 flex w-[54px] cursor-pointer justify-center rounded-md bg-pink-300 py-1 text-sm transition-all hover:bg-pink-400 hover:text-white'>
              <button className='h-full w-full' onClick={onClickReplyWrite}>
                등록
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
