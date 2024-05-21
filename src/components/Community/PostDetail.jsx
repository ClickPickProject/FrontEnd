'use client';
import StatusView from './BestPost/StatusView';
import WriterView from './BestPost/WriterView';
import CommentWrite from './CommentWrite';
import Comments from './Comments';
import HashtagView from './HashtagView';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { MyNicknameState, tokenState } from '@/atoms/tokenState';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CommentIcon, EmptyHeartIcon, FillHeartIcon, ReportIcon } from '../UI/Icons';
import Loading from '../Loading';
import {
  postCategoryNameState,
  postContentState,
  postEditModeState,
  postHashtagState,
  postTitleState,
} from '@/atoms/PostState';
import { postReportModalState, reportModalState } from '@/atoms/commentState';
import PostReportModal from './PostReportModal';
import { axiosInstance } from '../utils/Axios';
import { toast } from 'react-toastify';

export default function PostDetail() {
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
  const [postReportModal, setPostReportModal] = useRecoilState(postReportModalState);
  const {
    data: userPost,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['post', params.id],
    queryFn: async () => {
      const res = await axios.get(`/api/post/${params.id}`);

      if (res.status !== 200) {
        throw new Error('Failed to fetch data');
      }

      return res.data;
    },
  });

  if (isPending || isError) return <Loading isPending={isPending} isError={isError} />;

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
        await axiosInstance.get(`/api/member/likedpost/${params.id}`);
        queryClient.invalidateQueries(['post', params.id]);
      }
      if (likePostCheck === false) {
        await axiosInstance.get(`/api/member/likedpost/${params.id}`);
        queryClient.invalidateQueries(['post', params.id]);
      }
    } catch (err) {
      toast.error('좋아요 중 오류가 발생했습니다.');
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

  const onClickPostDelete = async (postId) => {
    try {
      await axiosInstance.delete(`/api/member/post/${postId}`);
      toast.success('게시글이 삭제되었습니다.');
    } catch (err) {
      toast.error('게시글 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <div className='mt-8 w-full max-w-[830px]'>
        <div className='my-4 flex flex-col gap-4'>
          <h2 className='text-2xl font-semibold'>{title}</h2>
          {/* 작성자 */}
          <div className='flex justify-between'>
            <WriterView writer={nickname} date={date} profile={profileUrl} />
            <StatusView viewCount={viewCount} likeCount={likeCount} />
          </div>

          {/* 게시글 신고 */}
          <div className='flex cursor-pointer items-center gap-1 opacity-50 transition-all hover:opacity-100'>
            <ReportIcon color='red' opacity='70%' />
            <div className='text-xs font-semibold' onClick={() => setPostReportModal(true)}>
              신고
            </div>
          </div>
          {postReportModal && (
            <div
              className='fixed inset-0 z-10 overflow-y-auto'
              onKeyDown={(e) => {
                if (e.code === 'Escape') setPostReportModal(false);
              }}
            >
              <div className='flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0'>
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
              <button className='hover:opacity-100' onClick={() => onClickPostDelete(postId)}>
                삭제
              </button>
            </div>
          ) : null}
        </div>
        {/* 내용 */}
        <div className='mb-4'>
          {position && <div className='mb-4'>장소: {position}</div>}
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        {/* 해쉬태그 */}
        <div className='mb-4'>
          <HashtagView tags={hashtags} />
        </div>
        <div className='flex items-center gap-1 text-base '>
          {likePostCheck ? (
            <span onClick={onClickLike} className='hover:cursor-pointer'>
              <FillHeartIcon size={20} color='red' />
            </span>
          ) : (
            <span onClick={onClickLike} className='hover:cursor-pointer'>
              <EmptyHeartIcon size={20} color='red' />
            </span>
          )}
          좋아요 {likeCount}
          <CommentIcon size={18} />
          댓글 {commentCount}
        </div>
        {/* 경계선 */}
        <div className='my-4 border-b-2' />
        <Comments comments={comments} />
        <CommentWrite />
      </div>
    </>
  );
}
