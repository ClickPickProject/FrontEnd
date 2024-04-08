'use client';
import WriterView from '../BestPost/WriterView';
import CenterComments from './CenterComments';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { MyNicknameState, tokenState } from '@/atoms/tokenState';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CommentIcon, ReportIcon, PencilIcon } from '../../UI/Icons';
import { loginState } from '@/atoms/tokenState';
import Loading from '../../Loading';
import CenterCommentWrite from './CommentWrite';
import Link from 'next/link';
import {
  questionCategoryNameState,
  questionContentState,
  questionEditModeState,
  questionHashtagState,
  questionTitleState,
} from '@/atoms/questionState';
import { reportModalState } from '@/atoms/commentState';
import PostReportModal from '../PostReportModal';

export default function CenterPostDetail() {
  const params = useParams();
  const token = useRecoilValue(tokenState);
  const myNickname = useRecoilValue(MyNicknameState);
  const router = useRouter();
  const isLogin = useRecoilValue(loginState);
  const setQuestionEditMode = useSetRecoilState(questionEditModeState);
  const setQuestionTitle = useSetRecoilState(questionTitleState);
  const setQuestionCategoryName = useSetRecoilState(questionCategoryNameState);
  const setQuestionContent = useSetRecoilState(questionContentState);
  const setQuestionHashtag = useSetRecoilState(questionHashtagState);
  const [reportModal, setReportModal] = useRecoilState(reportModalState);

  const {
    data: userPost,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['post', params.id],
    queryFn: async () => {
      const res = await axios.get(`/api/question/${params.id}`, {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      });

      if (res.status !== 200) {
        throw new Error('Failed to fetch data');
      }

      return res.data;
    },
  });

  if (isPending) return <Loading isPending={isPending} />;
  if (isError) return <div>불러오는 중 에러가 발생하였습니다.</div>;

  const { title, questionId, nickname, date, postCategory, content, hashtags, commentCount, answer, profileUrl } =
    userPost;

  const onClickPostEdit = async (title, category, content, hashtags) => {
    setQuestionEditMode(true);
    setQuestionTitle(title);
    setQuestionCategoryName(category);
    setQuestionContent(content);
    setQuestionHashtag(hashtags);
    router.push(`/content/community/${params.id}/edit`);
  };

  const onClickPostDelete = async () => {};

  return (
    <>
      <div className='w-full max-w-[830px]'>
        <div className='my-4 flex flex-col gap-2'>
          <h2 className='text-2xl font-semibold'>[Q&A] {title}</h2>
          {/* 작성자 */}
          <div className='flex justify-between'>
            <WriterView writer={nickname} date={date} profile={profileUrl} />
          </div>

          {/* 게시글 신고 */}
          <div className='flex cursor-pointer items-center gap-1 opacity-50 transition-all hover:opacity-100'>
            <ReportIcon color='red' opacity='70%' />
            <div className='text-xs font-semibold' onClick={() => setReportModal(true)}>
              신고
            </div>
          </div>
          {reportModal && (
            <div
              className='fixed inset-0 z-10 overflow-y-auto'
              onKeyDown={(e) => {
                if (e.code === 'Escape') setReportModal(false);
              }}
            >
              <div className='flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0'>
                {/* <PostReportModal nickname={nickname} /> */}
                <PostReportModal nickname={nickname} postId={questionId} />
              </div>
            </div>
          )}
          {nickname === myNickname ? (
            <div className='flex gap-2 text-sm [&>button]:opacity-50 [&>button]:transition-all'>
              <button
                className='hover:opacity-100'
                onClick={() => onClickPostEdit(title, postCategory, content, hashtags)}
              >
                수정
              </button>
              <button className='hover:opacity-100' onClick={() => onClickPostDelete()}>
                삭제
              </button>
            </div>
          ) : null}
        </div>
        {/* 내용 */}
        <div className='flex flex-col gap-2'>
          <div className='font-semibold text-pink-600 opacity-50'>사용자가 질문한 내용입니다.</div>
          <div className='mb-4 flex flex-row'>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
        <div className='flex items-center gap-1 text-base '>
          <CommentIcon size={18} />
          답변 {commentCount}
          <Link
            href={`${isLogin ? '/content/center/AdminWrite' : '/login'}`}
            className='ml-auto flex h-[30px] w-[100px] items-center justify-center gap-2 rounded-lg bg-pink-400 text-sm font-bold text-white transition-all hover:bg-pink-500'
          >
            <PencilIcon color='white' size={18} />
            답변하기
          </Link>
        </div>
        {/* 경계선 */}
        <div className='my-4 border-b-2' />
        {/* 차후 수정할 댓글 내용들 */}
        <CenterComments answer={answer} />
        {/* <CenterCommentWrite /> */}
      </div>
    </>
  );
}
