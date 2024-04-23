import WriterView from '../BestPost/WriterView';
import { useState } from 'react';
import { MyNicknameState, tokenState } from '@/atoms/tokenState';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { pageState } from '@/atoms/pageState';
import ReplyToggle from '../ReplyToggle';
import { ReplyIcon } from '@/components/UI/Icons';
import { useEffect } from 'react';
import CenterReplyComments from './CenterReplyComments';
import { postContentState, postTitleState } from '@/atoms/PostState';
export default function CenterComments({ answer }) {
  const [replyToggle, setReplyToggle] = useState(Array(answer.length).fill(false));
  const token = useRecoilValue(tokenState);
  const [editMode, setEditMode] = useState(null); // 추가: 수정 모드를 저장하는 상태
  const [pageState1, setPageState1] = useRecoilState(pageState);
  const myNickname = useRecoilValue(MyNicknameState);
  const [commentContent, setCommentContent] = useState('');
  const router = useRouter();
  const setPostContent = useSetRecoilState(postContentState);
  const setPostTitle = useSetRecoilState(postTitleState);

  // 삭제
  const onClickCommentDelete = async (answerId) => {
    try {
      const res = await axios.delete(`/api/admin/answer/${answerId}`, {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200) {
        alert('질문을 삭제하였습니다.');
        router.push('/');
      }
    } catch (err) {
      console.log(err);
      alert('사용자가 삭제할 수 없는 질문입니다.');
      console.log(answerId);
    }
  };
  // 수정
  const onClickEdit = (answerId, title, content) => {
    setPostContent(content);
    setPostTitle(title);
    router.push(`/content/center/${answerId}/answer`);
    setPageState1(`/api/admin/answer/${answerId}`);
  };
  // 답변
  const onClickReply = (questionId, answerId) => {
    router.push(`/content/center/${answerId}/answer`);
    setPageState1(`/api/member/${questionId}/${answerId}/reanswer`);
  };

  return (
    <div>
      <ul>
        {/* 댓글 목록 */}
        {answer.map((comment) => (
          <li key={comment.answerId} className='flex flex-col gap-4'>
            <WriterView writer={comment.nickname} date={comment.createAt} profile={comment.profileUrl} />
            <h2 className=' font-semibold'> {comment.title}</h2>

            <div className='flex flex-col gap-1 rounded-md'>
              <div dangerouslySetInnerHTML={{ __html: comment.content }} />
            </div>
            {/* 답글 버튼 */}
            <div className='flex items-center gap-1'>
              <div
                className={`flex cursor-pointer items-center gap-1 opacity-50 transition-all hover:opacity-100`}
                onClick={() => onClickReply(comment.questionId, comment.answerId)}
              >
                <ReplyIcon color='#ec4899' />

                <div className={`cursor-pointer text-sm font-semibold hover:opacity-100`}>답글</div>
              </div>
              {/* 댓글 수정 및 삭제 */}
              {comment.nickname === myNickname ? (
                <button
                  className='text-sm font-semibold opacity-50 transition-all hover:opacity-100'
                  onClick={() => onClickEdit(comment.answerId, comment.title, comment.content)}
                >
                  {comment.commentStatus === 'DELETE' ? null : '수정'}
                </button>
              ) : null}
              {comment.nickname === myNickname ? (
                <button
                  onClick={() => onClickCommentDelete(comment.answerId)}
                  className='text-sm font-semibold opacity-50 transition-all hover:opacity-100'
                >
                  {comment.commentStatus === 'DELETE' ? null : '삭제'}
                </button>
              ) : null}
              <div className=' border' />
            </div>
            <div className='flex w-full border-b-2 ' />

            {/* 답글 목록 */}
            <div className='ml-5'>
              {comment.reAnswer.map((reply) => (
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
        ))}
      </ul>
    </div>
  );
}
