import WriterView from './BestPost/WriterView';
import { useState } from 'react';
import ReplyComments from './ReplyComments';
import { ReplyIcon, ReportIcon } from '../UI/Icons';
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { MyNicknameState, tokenState } from '@/atoms/tokenState';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useParams } from 'next/navigation';

export default function Comments({ comments }) {
  const [replyToggle, setReplyToggle] = useState(Array(comments.length).fill(false));
  const params = useParams();
  const token = useRecoilValue(tokenState);
  const [editMode, setEditMode] = useState(null); // 추가: 수정 모드를 저장하는 상태
  const [reply, setReply] = useState('');
  const [parentCommentId, setParentCommentId] = useState('');
  const [myNickname, setMyNickname] = useRecoilState(MyNicknameState);
  const queryClient = new QueryClient();

  if (!comments || comments.length === 0) {
    return null;
  }

  const onClickReply = (commentId) => {
    console.log(replyToggle);
    setReplyToggle((prevToggles) => {
      setParentCommentId(commentId);
      const newToggles = [...prevToggles];
      newToggles.fill(false);
      newToggles[commentId] = !prevToggles[commentId];
      return newToggles;
    });
  };

  const onClickCommentDelete = async (commentId) => {
    const res = await axios.delete(
      `/api/member/comment/${params.id}`,
      { comment_id: commentId },
      {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      },
    );
    if (res.status === 200) {
      // queryClient.invalidateQueries(['comments', params.id]);
    }
  };

  const onClickEdit = (commentId) => {
    setEditMode(commentId); // 추가: 수정 버튼 클릭 시 수정 모드로 변경
  };

  const onSaveEdit = async (commentId, newContent) => {
    // 추가: 저장 버튼 클릭 시 수정된 내용을 저장
    // axios 통신 코드 추가 필요
    setEditMode(null); // 저장 후 수정 모드 종료
  };

  const onCancelEdit = () => {
    setEditMode(null); // 추가: 취소 버튼 클릭 시 수정 모드 종료
  };

  const handleReplyChange = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
    setReply(e.target.value);
  };

  const onClickReplyWrite = async () => {
    const body = {
      parentcommentId: parentCommentId,
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
        setReply('');
      }
    } catch (err) {
      alert(err);
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
                  <button className='hover:text-pink-400' onClick={() => onSaveEdit(comment.commentId, '수정된 내용')}>
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
                onClick={() => onClickReply(comment.commentId)}
              >
                <ReplyIcon color='#ec4899' />
                <div className={`cursor-pointer text-sm font-semibold hover:opacity-100`}>
                  다압글 {comment.commentId}
                </div>
              </div>
              {comment.nickname === myNickname ? (
                <button
                  className='text-sm font-semibold opacity-50 transition-all hover:opacity-100'
                  onClick={() => onClickEdit(comment.commentId)}
                >
                  수정
                </button>
              ) : null}
              {comment.nickname === myNickname ? (
                <button
                  onClick={() => onClickCommentDelete(comment.commentId)}
                  className='text-sm font-semibold opacity-50'
                >
                  삭제
                </button>
              ) : null}
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
          </li>
        ))}
      </ul>
    </div>
  );
}
