'use client';
import WriterView from './BestPost/WriterView';
import { EmptyHeartIcon, FillHeartIcon, ReplyIcon, ReportIcon } from '../UI/Icons';
import { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { MyNicknameState } from '@/atoms/tokenState';
import { parentCommentIdState, replyCommentCheckState, reportModalState } from '@/atoms/commentState';
import ReportModal from './ReportModal';

export default function ReplyComments({
  reply,
  onSubmitReply,
  onClickEdit,
  editMode,
  onSaveEdit,
  onCancelEdit,
  onClickCommentDelete,
  onClickCommentLike,
  onClickCommentReport,
}) {
  const [replyComment, setReplyComment] = useState('');
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [reportModal, setReportModal] = useRecoilState(reportModalState);
  const [replyCommentCheck, setReplyCommentCheck] = useState(true);

  const myNickname = useRecoilValue(MyNicknameState);
  const setParentCommentId = useSetRecoilState(parentCommentIdState);

  const handleReplyChange = (e) => {
    setReplyComment(e.target.value);
  };

  const toggleReply = () => {
    setParentCommentId(reply.parentId);
    setIsReplyOpen((prevIsReplyOpen) => !prevIsReplyOpen);
  };

  const submitReply = () => {
    const mentionedWriter = `@${reply.nickname}`; // 작성자의 닉네임을 멘션
    const fullReplyContent = `${mentionedWriter} ${replyComment}`;
    onSubmitReply(fullReplyContent);
    setReplyComment('');
    toggleReply(); // 답글 제출 후 답글 폼 close
  };

  const mentionMatch = reply.content.match(/(@\S+)\s(.+)/);
  const mention = mentionMatch ? mentionMatch[1] : ''; // match 결과가 null이 아니면 첫 번째 그룹을 가져옴
  const commentContent = mentionMatch ? mentionMatch[2] : ''; // match 결과가 null이 아니면 두 번째 그룹을 가져옴

  const onChangeTextarea = (e) => {
    setReplyComment(e.target.value);
  };

  return (
    <>
      {/* 답글 목록 */}
      <div className='flex flex-col gap-2'>
        <WriterView writer={reply.nickname} date={reply.createAt} />
        {/* <div>{reply.content}</div> */}
        {/* <div>
          <span className='text-sm opacity-50'>{mention}</span> {commentContent}
        </div> */}

        {editMode === reply.commentId ? ( // 수정 모드인 경우
          <div className='mb-5 ml-4 h-full w-full rounded-lg border-2 border-pink-200 pl-2 focus:border-pink-500'>
            <textarea
              defaultValue={''} // 기존 내용을 입력창에 미리 표시
              onChange={onChangeTextarea}
              className='flex w-full resize-none flex-wrap overflow-hidden rounded-lg py-2 outline-none'
            />
            <div>
              <button
                className='hover:text-pink-400'
                onClick={() => onSaveEdit(reply.commentId, replyComment, '@' + reply.nickname, replyCommentCheck)}
              >
                저장
              </button>
            </div>
            <div>
              <button className='hover:text-pink-400' onClick={onCancelEdit}>
                취소
              </button>
            </div>
          </div>
        ) : (
          <div>
            <span className='text-sm opacity-50'>{mention}</span>
            {commentContent}
          </div>
        )}
        {reportModal && (
          <div
            className='fixed inset-0 z-10 overflow-y-auto'
            onKeyDown={(e) => {
              if (e.code === 'Escape') setReportModal(false);
            }}
          >
            <div className='flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0'>
              <ReportModal nickname={reply.nickname} commentId={reply.commentId} />
            </div>
          </div>
        )}
        <div className='flex items-center gap-1'>
          <div className='flex cursor-pointer items-center gap-1 opacity-50 transition-all hover:opacity-100'>
            {reply.likeCommentCheck ? (
              <div
                className='flex items-center gap-1'
                onClick={() => onClickCommentLike(reply.commentId, reply.likeCommentCheck)}
              >
                <FillHeartIcon color='red' />
                <div className='text-sm font-semibold'>{reply.likeCount}</div>
              </div>
            ) : (
              <div
                className='flex items-center gap-1'
                onClick={() => onClickCommentLike(reply.commentId, reply.likeCommentCheck)}
              >
                <EmptyHeartIcon color='red' />
                <div className='text-sm font-semibold'>{reply.likeCount}</div>
              </div>
            )}
          </div>

          <div className='flex cursor-pointer items-center gap-1 opacity-50 transition-all hover:opacity-100'>
            <ReportIcon color='red' opacity='70%' />
            <div className='text-sm font-semibold' onClick={onClickCommentReport}>
              신고
            </div>
          </div>

          <div
            className='flex cursor-pointer items-center gap-1 opacity-50 transition-all hover:opacity-100'
            onClick={() => toggleReply(reply)}
          >
            <ReplyIcon color='#ec4899' />
            <div className='text-sm font-semibold hover:opacity-100'>답글</div>
          </div>
          {reply.nickname === myNickname ? (
            <button
              className='text-sm font-semibold opacity-50 transition-all hover:opacity-100'
              onClick={() => onClickEdit(reply.commentId)}
            >
              {reply.commentStatus === 'DELETE' ? null : '수정'}
            </button>
          ) : null}
          {reply.nickname === myNickname ? (
            <button onClick={() => onClickCommentDelete(reply.commentId)} className='text-sm font-semibold opacity-50'>
              {reply.commentStatus === 'DELETE' ? null : '삭제'}
            </button>
          ) : null}
        </div>
        <div className='my-2 border' />
        {isReplyOpen && (
          <div className='mb-5 h-full w-full rounded-lg border-2 border-pink-200 pl-2 focus:border-pink-500'>
            <div className='mt-2'>
              <WriterView writer={myNickname} />
            </div>
            <textarea
              placeholder='답글을 입력하세요'
              className='flex w-full resize-none flex-wrap overflow-hidden rounded-lg py-2 outline-none'
              value={replyComment}
              onChange={handleReplyChange}
            />
            <div className='m-2 flex w-[54px] cursor-pointer justify-center rounded-md bg-pink-300 py-1 text-sm transition-all hover:bg-pink-400 hover:text-white'>
              <button className='h-full w-full' onClick={submitReply}>
                등록
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
