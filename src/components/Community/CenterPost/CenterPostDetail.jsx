'use client';
import WriterView from '../BestPost/WriterView';
import CommentWrite from '../CommentWrite';
import Comments from '../Comments';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { MyNicknameState, tokenState } from '@/atoms/tokenState';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CommentIcon, EmptyHeartIcon, FillHeartIcon, ReportIcon } from '../../UI/Icons';
import { TbQuestionMark } from 'react-icons/tb';
import Loading from '../../Loading';
import {
  postCategoryNameState,
  postContentState,
  postEditModeState,
  postHashtagState,
  postTitleState,
} from '@/atoms/PostState';
import { reportModalState } from '@/atoms/commentState';
import PostReportModal from '../PostReportModal';

export default function CenterPostDetail() {
  const params = useParams();
  const queryClient = useQueryClient();
  const token = useRecoilValue(tokenState);
  const myNickname = useRecoilValue(MyNicknameState);
  const router = useRouter();
  const setPostEditMode = useSetRecoilState(postEditModeState);
  const setPostTitle = useSetRecoilState(postTitleState);
  const setPostCategoryName = useSetRecoilState(postCategoryNameState);
  const setPostContent = useSetRecoilState(postContentState);
  const setPostHashtag = useSetRecoilState(postHashtagState);
  const [reportModal, setReportModal] = useRecoilState(reportModalState);
  const {
    data: userPost,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['post', params.id],
    queryFn: async () => {
      const res = await axios.get(`/api/post/${params.id}`, {
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

  const {
    title,
    postId,
    nickname,
    date,
    viewCount,
    postCategory,
    position,
    content,
    hashtags,
    likePostCheck,
    likeCount,
    commentCount,
    comments,
    profileUrl,
  } = userPost;
  const onClickLike = async () => {
    try {
      if (likePostCheck === true) {
        await axios.get(`/api/member/likedpost/${params.id}`, {
          withCredentials: true,
          headers: {
            Authorization: token,
          },
        });
        queryClient.invalidateQueries(['post', params.id]);
      }
      if (likePostCheck === false) {
        await axios.get(`/api/member/likedpost/${params.id}`, {
          withCredentials: true,
          headers: {
            Authorization: token,
          },
        });
        queryClient.invalidateQueries(['post', params.id]);
      }
    } catch (err) {
      console.error('좋아요 오류', err);
    }
  };

  const onClickPostEdit = async (title, category, content, hashtags) => {
    setPostEditMode(true);
    setPostTitle(title);
    setPostCategoryName(category);
    setPostContent(content);
    setPostHashtag(hashtags);
    router.push(`/content/community/${params.id}/edit`);
  };

  const onClickPostDelete = async () => {};

  return (
    <>
      <div className='w-full max-w-[830px]'>
        <div className='my-4 flex flex-col gap-2'>
          <h2 className='text-2xl font-semibold'>{title}</h2>
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
                <PostReportModal nickname={nickname} postId={postId} />
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
        <div className='mb-4 flex flex-row'>
          <TbQuestionMark size={50} />
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>

        <div className='flex items-center gap-1 text-base '>
          <CommentIcon size={18} />
          답변 {commentCount}
        </div>
        {/* 경계선 */}
        <div className='my-4 border-b-2' />
        {/* 차후 수정할 댓글 내용들 */}
        <Comments comments={comments} />
        <CommentWrite />
      </div>
    </>
  );
}
