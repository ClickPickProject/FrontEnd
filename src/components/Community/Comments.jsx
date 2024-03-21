import WriterView from './BestPost/WriterView';
import { useState } from 'react';
import { ReplyIcon, ReportIcon } from '../UI/Icons';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { MyNicknameState, tokenState } from '@/atoms/tokenState';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { parentCommentIdState, parentCommentNickState } from '@/atoms/commentState';
import ReplyComments from './ReplyComments';
import ReplyToggle from './ReplyToggle';
import axios from 'axios';

export default function Comments({ comments }) {
  const [replyToggle, setReplyToggle] = useState(Array(comments.length).fill(false));
  const params = useParams();
  const token = useRecoilValue(tokenState);
  const [editMode, setEditMode] = useState(null); // 추가: 수정 모드를 저장하는 상태
  const [parentCommentId, setParentCommentId] = useRecoilState(parentCommentIdState);
  const setParentCommentNickname = useSetRecoilState(parentCommentNickState);
  const myNickname = useRecoilValue(MyNicknameState);
  const queryClient = useQueryClient();

  if (!comments || comments.length === 0) {
    return null;
  }

  const onClickReply = (commentId, nickname) => {
    setParentCommentNickname(nickname);
    setParentCommentId(commentId);
    setReplyToggle((prevToggles) => {
      const newToggles = [...prevToggles];
      newToggles.fill(false);
      newToggles[commentId] = !prevToggles[commentId];
      return newToggles;
    });
  };

  const onClickCommentDelete = async (commentId) => {
    console.log('delete');
    try {
      const res = await axios.delete(`/api/member/comment/${commentId}`, {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200) {
        queryClient.invalidateQueries(['post', params.id]);
      }
    } catch (error) {
      console.error('댓글 삭제 오류:', error);
    }
  };

  const onClickEdit = (commentId) => {
    setEditMode(commentId); // 추가: 수정 버튼 클릭 시 수정 모드로 변경
  };

  const onSaveEdit = async (commentId, newContent, nickname) => {
    // 추가: 저장 버튼 클릭 시 수정된 내용을 저장
    try {
      console.log(nickname + newContent);
      const body = {
        postId: commentId,
        content: `${nickname} ${newContent}`,
      };
      const res = await axios.post(`/api/member/comment/${commentId}`, body, {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200) {
        console.log('저장');
        queryClient.invalidateQueries(['post', params.id]);
      }
    } catch (err) {
      console.log(err);
    }
    setEditMode(null); // 저장 후 수정 모드 종료
  };

  const onCancelEdit = () => {
    setEditMode(null); // 추가: 취소 버튼 클릭 시 수정 모드 종료
  };

  const onSubmitReply = async (content) => {
    try {
      const body = {
        parentCommentId: parentCommentId,
        postId: params.id,
        content: content,
      };
      const res = await axios.post('/api/member/recomment', body, {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200) {
        queryClient.invalidateQueries({ queryKey: ['post', params.id] });
        setReplyToggle((prevToggles) => {
          const newToggles = [...prevToggles];
          newToggles[parentCommentId] = false;
          return newToggles;
        });
      }
    } catch (error) {
      console.error('답글 작성 오류:', error);
    }
  };

  return (
    <div>
      <ul>
        {/* 댓글 목록 */}
        {comments.map((comment) => (
          <li key={comment.commentId} className='flex flex-col gap-2'>
            <WriterView writer={comment.nickname} date={comment.createAt} />
            {editMode === comment.commentId ? ( // 수정 모드인 경우
              <div className='mb-5 ml-4 h-full w-full rounded-lg border-2 border-pink-200 pl-2 focus:border-pink-500'>
                <textarea
                  defaultValue={comment.content} // 기존 내용을 입력창에 미리 표시
                  className='overlfow-hidden flex w-full resize-none flex-wrap rounded-lg py-2 outline-none'
                />
                <div>
                  <button className='hover:text-pink-400' onClick={() => onSaveEdit(comment.commentId)}>
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
              <div>{comment.content}</div>
            )}
            {/* 신고 및 답글 버튼 */}
            <div className='flex items-center gap-1'>
              <div className='flex cursor-pointer items-center gap-1 opacity-50 transition-all hover:opacity-100'>
                <ReportIcon color='red' />
                <div className='text-sm font-semibold'>신고</div>
              </div>
              <div
                className={`flex cursor-pointer items-center gap-1 opacity-50 transition-all hover:opacity-100`}
                onClick={() => onClickReply(comment.commentId, comment.nickname)}
              >
                <ReplyIcon color='#ec4899' />

                <div className={`cursor-pointer text-sm font-semibold hover:opacity-100`}>답글</div>
              </div>

              {/* 댓글 수정 및 삭제 */}
              {comment.nickname === myNickname ? (
                <button
                  className='text-sm font-semibold opacity-50 transition-all hover:opacity-100'
                  onClick={() => onClickEdit(comment.commentId)}
                >
                  {comment.commentStatus === 'DELETE' ? null : '수정'}
                </button>
              ) : null}
              {comment.nickname === myNickname ? (
                <button
                  onClick={() => onClickCommentDelete(comment.commentId)}
                  className='text-sm font-semibold opacity-50'
                >
                  {comment.commentStatus === 'DELETE' ? null : '삭제'}
                </button>
              ) : null}
            </div>
            <div className='my-2 border' />
            {replyToggle[comment.commentId] && (
              <ReplyToggle
                commentId={comment.commentId}
                commentNickname={comment.nickname}
                parentNickname={comment.nickname}
                onSubmitReply={onSubmitReply}
              />
            )}
            {/* 답글 목록 */}
            <div className='ml-4'>
              {comment.recommentList.map((reply) => (
                <ReplyComments
                  key={reply.commentId}
                  reply={reply}
                  comments={comments}
                  onSubmitReply={onSubmitReply}
                  onClickEdit={onClickEdit}
                  editMode={editMode}
                  onSaveEdit={onSaveEdit}
                  onCancelEdit={onCancelEdit}
                  onClickCommentDelete={onClickCommentDelete}
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
