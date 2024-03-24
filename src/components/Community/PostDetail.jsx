'use client';
import StatusView from './BestPost/StatusView';
import WriterView from './BestPost/WriterView';
import CommentWrite from './CommentWrite';
import Comments from './Comments';
import HashtagView from './HashtagView';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { MyNicknameState, tokenState } from '@/atoms/tokenState';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CommentIcon, EmptyHeartIcon, FillHeartIcon } from '../UI/Icons';
import Loading from '../Loading';
import {
  postCategoryNameState,
  postContentState,
  postEditModeState,
  postHashtagState,
  postTitleState,
} from '@/atoms/PostState';
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
    nickname,
    date,
    viewCount,
    postCategory,
    content,
    hashtags,
    likePostCheck,
    likeCount,
    commentCount,
    comments,
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
    router.push('/content/community/edit');
  };

  const onClickPostDelete = async () => {};

  return (
    <>
      <div className='w-full max-w-[830px]'>
        <div className='my-4 flex flex-col gap-2'>
          <h2 className='text-2xl font-semibold'>{title}</h2>
          {/* 작성자 */}
          <div className='flex justify-between'>
            <WriterView writer={nickname} date={date} />
            <StatusView viewCount={viewCount} likeCount={likeCount} />
          </div>
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
        <div className='mb-4'>
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
