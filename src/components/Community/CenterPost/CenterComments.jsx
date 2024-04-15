import WriterView from '../BestPost/WriterView';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { MyNicknameState, tokenState } from '@/atoms/tokenState';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { parentCommentIdState, parentCommentNickState } from '@/atoms/commentState';
import axios from 'axios';

export default function CenterComments({ answer }) {
  // const [replyToggle, setReplyToggle] = useState(Array(comments.length).fill(false));
  const params = useParams();
  const token = useRecoilValue(tokenState);
  const [editMode, setEditMode] = useState(null); // 추가: 수정 모드를 저장하는 상태
  const [parentCommentId, setParentCommentId] = useRecoilState(parentCommentIdState);
  const setParentCommentNickname = useSetRecoilState(parentCommentNickState);
  const myNickname = useRecoilValue(MyNicknameState);
  const [commentContent, setCommentContent] = useState('');
  const queryClient = useQueryClient();

  const onClickCommentDelete = async (commentId) => {
    try {
      const res = await axios.delete(`/api/admin/${commentId}/answer`, {
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

  const onSaveEdit = async (commentId, newContent, nickname, replyCommentCheck) => {
    // 추가: 저장 버튼 클릭 시 수정된 내용을 저장
    try {
      const body = {
        postId: commentId,
        content: replyCommentCheck ? `${nickname}  ${newContent}` : newContent,
      };
      const res = await axios.post(`/api/admin/${commentId}/answer`, body, {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200) {
        queryClient.invalidateQueries(['post', params.id]);
      }
    } catch (err) {
      console.log(err);
    }
    setEditMode(null); // 저장 후 수정 모드 종료
  };

  const onCancelEdit = () => {
    setEditMode(null); // 취소 버튼 클릭 시 수정 모드 종료
  };

  const onChangeTextarea = (e) => {
    setCommentContent(e.target.value);
  };

  return (
    <div>
      <ul>
        {/* 댓글 목록 */}
        {answer.map((comment) => (
          <li key={comment.commentId} className='flex flex-col gap-4'>
            <WriterView writer={comment.nickname} date={comment.createAt} profile={comment.profileUrl} />
            {editMode === comment.commentId ? ( // 수정 모드인 경우
              <div className='mb-5 ml-4 h-full w-full rounded-lg border-2 border-pink-200 pl-2 focus:border-pink-500'>
                <textarea
                  defaultValue={comment.content} // 기존 내용을 입력창에 미리 표시
                  className='flex w-full resize-none flex-wrap overflow-hidden rounded-lg py-2 outline-none'
                  onChange={onChangeTextarea}
                />
                <div>
                  <button className='hover:text-pink-400' onClick={() => onSaveEdit(comment.commentId, commentContent)}>
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
              <div className='flex flex-col gap-2 rounded-md  p-2 py-4'>
                <p className='font-semibold text-pink-600 opacity-50'>관리자의 답글입니다.</p>
                <p>{comment.content}</p>
              </div>
            )}
            {/* 답글 버튼 */}
            <div className='flex items-center gap-1'>
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
          </li>
        ))}
      </ul>
    </div>
  );
}
