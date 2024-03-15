'use client';
import StatusView from './BestPost/StatusView';
import WriterView from './BestPost/WriterView';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { FaRegCommentDots } from 'react-icons/fa6';
import { useParams } from 'next/navigation';
import HashtagView from './HashtagView';
import axios from 'axios';
import { tokenState } from '@/atoms/tokenState';
import { useRecoilValue } from 'recoil';
import CommentWrite from './CommentWrite';
import Comments from './Comments';
import { useQuery, useQueryClient } from 'react-query';
export default function PostDetail() {
  const params = useParams();
  const queryClient = useQueryClient();
  const token = useRecoilValue(tokenState);
  const {
    data: userPost,
    isLoading,
    isError,
  } = useQuery(['post', params.id], async () => {
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
  });

  if (isLoading) return <div>로딩중입니다...</div>;
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
        console.log('likePostCheck true');
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
            <IoMdHeart size={20} color='red' onClick={onClickLike} className='hover:cursor-pointer' />
          ) : (
            <IoMdHeartEmpty size={20} color='red' onClick={onClickLike} className='hover:cursor-pointer' />
          )}
          좋아요 {likeCount}
          <FaRegCommentDots size={18} />
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
