'use client';
import StatusView from './BestPost/StatusView';
import WriterView from './BestPost/WriterView';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { FaRegCommentDots } from 'react-icons/fa6';
import { useParams } from 'next/navigation';
import HashtagView from './HashtagView';
import { useRecoilValue } from 'recoil';
import { postSelectorFamily } from '@/atoms/PostState';
import { useState } from 'react';
import axios from 'axios';
import Comment from './Comment';
export default function PostDetail() {
  const params = useParams();
  const userPost = useRecoilValue(postSelectorFamily(params.id));
  const [likeCount, setLikeCount] = useState(userPost.likeCount);
  const [isLiked, setIsLiked] = useState(false);

  const onClickLike = async () => {
    try {
      if (isLiked) {
        // unlike
        await axios.get(`/api/member/likedpost/${params.id}`);
        setLikeCount(likeCount - 1);
      } else {
        // like
        await axios.get(`/api/member/likedpost/${params.id}`);
        setLikeCount(likeCount + 1);
      }
      setIsLiked(!isLiked);
    } catch (err) {
      console.error('좋아요 오류', err);
    }
  };

  return (
    <>
      <div className='w-full max-w-[830px]'>
        <div className='my-8 flex flex-col gap-4'>
          <h2 className='text-2xl font-semibold'>{userPost.title}</h2>
          {/* 작성자 */}
          <div className='flex justify-between'>
            <WriterView writer={userPost.nickname} date={userPost.date} />
            <StatusView viewCount={userPost.viewCount} likeCount={userPost.likeCount} />
          </div>
        </div>
        {/* 내용 */}
        <div className='p-4'>
          <div dangerouslySetInnerHTML={{ __html: userPost.content }} />
        </div>
        {/* 해쉬태그 */}
        <div className='mb-4'>
          <HashtagView tags={userPost.hashtags} />
        </div>
        <div className='flex items-center gap-1'>
          {isLiked ? (
            <IoMdHeart size={20} color='red' onClick={onClickLike} className='hover:cursor-pointer' />
          ) : (
            <IoMdHeartEmpty size={20} color='red' onClick={onClickLike} className='hover:cursor-pointer' />
          )}
          좋아요 {likeCount}
          <FaRegCommentDots size={18} />
          댓글 {userPost.CommentCount}
        </div>
        {/* 경계선 */}
        <Comment />
        <div className='mb-8 mt-4 border-b-2' />
      </div>
    </>
  );
}
