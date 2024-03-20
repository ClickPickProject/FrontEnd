'use client';
import StatusView from './BestPost/StatusView';
import WriterView from './BestPost/WriterView';
import CommentWrite from './CommentWrite';
import Comments from './Comments';
import HashtagView from './HashtagView';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { tokenState } from '@/atoms/tokenState';
import { useRecoilValue } from 'recoil';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CommentIcon, EmptyHeartIcon, FillHeartIcon } from '../UI/Icons';
import Loading from '../Loading';
export default function PostDetail() {
  const params = useParams();
  const queryClient = useQueryClient();
  const token = useRecoilValue(tokenState);
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

  const { title, nickname, date, viewCount, content, hashtags, likePostCheck, likeCount, commentCount, comments } =
    userPost;
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
  return (
    <>
      <div className='w-full max-w-[830px]'>
        <div className='my-8 flex flex-col gap-4'>
          <h2 className='text-2xl font-semibold'>{title}</h2>
          {/* 작성자 */}
          <div className='flex justify-between'>
            <WriterView writer={nickname} date={date} />
            <StatusView viewCount={viewCount} likeCount={likeCount} />
          </div>
        </div>
        {/* 내용 */}
        <div className='p-4'>
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
