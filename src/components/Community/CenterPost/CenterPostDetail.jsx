'use client';
import WriterView from '../BestPost/WriterView';
import CenterComments from './CenterComments';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { MyNicknameState, tokenState, loginState } from '@/atoms/tokenState';
import { userNameState, userPhoneState, userNickNameState, userIdState } from '@/atoms/userInfoState';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { CommentIcon, PencilIcon } from '../../UI/Icons';
import Loading from '../../Loading';
import { pageState } from '@/atoms/pageState';
import { postContentState, postTitleState } from '@/atoms/PostState';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function CenterPostDetail() {
  const [pageState1, setPageState1] = useRecoilState(pageState);
  const params = useParams();
  const token = useRecoilValue(tokenState);
  const myNickname = useRecoilValue(userNickNameState);
  const router = useRouter();
  const isLogin = useRecoilValue(loginState);
  const setPostContent = useSetRecoilState(postContentState);
  const setPostTitle = useSetRecoilState(postTitleState);
  const {
    data: userPost,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['post', params.id],
    queryFn: async () => {
      try {
        const res = await axios.get(`/api/question/${params.id}`, {
          withCredentials: true,
          headers: {
            Authorization: token,
          },
        });

        return res.data;
      } catch (err) {
        if (err.response.status === 403) {
          toast.error('비공개된 게시글 입니다.', {
            position: 'top-right',
          });
          router.back();
        }
      }
    },
  });

  if (isPending) return <Loading isPending={isPending} />;
  if (isError) return <div>불러오는 중 에러가 발생하였습니다.</div>;

  const { title, questionId, nickname, date, content, commentCount, answer, profileUrl } = userPost;

  // 클릭시 글 수정
  const onClickPostEdit = async (title, content) => {
    setPostTitle(title);
    setPostContent(content);
    router.push(`/content/center/${params.id}/edit`);
    setPageState1(`/api/member/question/${params.id}`);
  };

  const onClickPostDelete = async () => {
    try {
      const res = await axios.delete(`/api/member/question/${params.id}`, {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200) {
        toast.success('질문을 삭제하였습니다.', {
          position: 'top-right',
        });
        router.push('/');
      }
    } catch (err) {
      console.log(err);
      toast.error('삭제할 수 없는 게시글입니다.', {
        position: 'top-right',
      });
    }
  };
  const routerPage = () => {
    router.push(isLogin ? `/content/center/${params.id}/answer` : '/login');
    setPageState1(`/api/admin/${params.id}/answer`);
  };

  return (
    <>
      <div className='w-full max-w-[830px] sm:px-[40px]'>
        <div className='my-4 flex flex-col gap-2'>
          <h2 className='text-2xl font-semibold'>[Q&A] {title}</h2>
          {/* 작성자 */}
          <div className='flex justify-between'>
            <WriterView writer={nickname} date={date} profile={profileUrl} />
          </div>
          {nickname === myNickname ? (
            <div className='flex gap-2 text-sm [&>button]:opacity-50 [&>button]:transition-all'>
              <button className='hover:opacity-100' onClick={() => onClickPostEdit(title, content)}>
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
          <div className='mb-4 flex flex-row'>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>

        <div className='flex items-center gap-1 text-base '>
          <CommentIcon size={18} />
          답변 {commentCount}
          {myNickname === '' ? (
            <button
              onClick={routerPage}
              className='ml-auto flex h-[30px] w-[100px] items-center justify-center gap-2 rounded-lg bg-pink-400 text-sm font-bold text-white transition-all hover:bg-pink-500'
              //넘겨줄 값 /api/admin/{question_id}/answer
            >
              <PencilIcon color='white' size={18} />
              답변하기
            </button>
          ) : null}
        </div>
        {/* 경계선 */}
        <div className='my-2 border-b-2' />
        {/* 차후 수정할 댓글 내용들 */}
        <CenterComments answer={answer} question={params.id} />
        {/* <CenterCommentWrite /> */}
      </div>
    </>
  );
}
