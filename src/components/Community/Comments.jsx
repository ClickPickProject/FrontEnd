import { MdReportGmailerrorred } from 'react-icons/md';
import WriterView from './BestPost/WriterView';
import { IoArrowRedoOutline } from 'react-icons/io5';
import { useState } from 'react';
import ReplyComments from './ReplyComments';

export default function Comments({ comments }) {
  const [replyToggle, setReplyToggle] = useState(Array(comments.length).fill(false));
  if (!comments || comments.length === 0) {
    return null;
  }

  const onClickReply = (commentId) => {
    setReplyToggle((prevToggles) => {
      const newToggles = [...prevToggles];
      newToggles.fill(false);
      newToggles[commentId] = !prevToggles[commentId];
      return newToggles;
    });
  };
  return (
    <div>
      <ul>
        {/* 댓글 목록 */}
        {comments.map((comment) => (
          <li key={comment.commentId} className='flex flex-col gap-2'>
            <WriterView writer={comment.nickname} date={comment.createAt} />
            <div>{comment.content}</div>
            {/* 신고 및 답글 버튼 */}
            <div className='flex items-center gap-1'>
              <div className='flex cursor-pointer items-center gap-1 opacity-50 transition-all hover:opacity-100'>
                <MdReportGmailerrorred color='red' />
                <div className='text-sm font-semibold'>신고</div>
              </div>
              <div
                className={`flex cursor-pointer items-center gap-1 opacity-50 transition-all hover:opacity-100`}
                onClick={() => onClickReply(comment.commentId)}
              >
                <IoArrowRedoOutline color='#ec4899' />
                <div className={`cursor-pointer text-sm font-semibold hover:opacity-100`}>답글</div>
              </div>
              {comment.nickname === '올빼미' ? <div className='text-sm font-semibold'>수정</div> : null}
              {comment.nickname === '올빼미' ? <div className='text-sm font-semibold'>삭제</div> : null}
            </div>
            <div className='my-2 border' />
            {/* 답글 목록 */}
            <div className='ml-4'>
              {comment.recommentList.map((reply) => (
                <ReplyComments key={reply.commentId} reply={reply} />
              ))}
            </div>

            {/* 답글 토글 */}
            {replyToggle[comment.commentId] && (
              <div className='mb-5 ml-4 h-full w-full rounded-lg border-2 border-pink-200 pl-2 focus:border-pink-500'>
                <div className='mt-2'>
                  <WriterView writer={'댓글작성자'} />
                </div>
                <textarea
                  placeholder='답글을 입력하세요'
                  className='overlfow-hidden flex w-full resize-none flex-wrap rounded-lg py-2 outline-none'
                />
                <div className='m-2 flex w-[54px] cursor-pointer justify-center rounded-md bg-pink-300 py-1 text-sm transition-all hover:bg-pink-400 hover:text-white'>
                  <button className='h-full w-full'>등록</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
