'use client';
import StatusView from './BestPost/StatusView';
import WriterView from './BestPost/WriterView';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { FaRegCommentDots } from 'react-icons/fa6';
import { useParams } from 'next/navigation';
import HashtagView from './HashtagView';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Comment from './Comments';
import { tokenState } from '@/atoms/tokenState';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userPostState } from '@/atoms/editorContentState';
import CommentWrite from './CommentWrite';
import { commentsState } from '@/atoms/PostState';
import Comments from './Comments';
export default function PostDetail() {
  const params = useParams();
  const [userPost, setUserPost] = useRecoilState(userPostState);
  const [likeCount, setLikeCount] = useState(userPost.likeCount);
  const [isLiked, setIsLiked] = useState(userPost.likePostCheck);
  const token = useRecoilValue(tokenState);
  const [comments, setComments] = useRecoilState(commentsState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const postUpdate = async () => {
      try {
        const res = await axios.get(`/api/post/${params.id}`, {
          withCredentials: true,
          headers: {
            Authorization: token,
          },
        });
        if (res.status === 200) {
          setUserPost(res.data);
          setComments(res.data.comments);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    postUpdate();
  }, []);

  useEffect(() => {
    setIsLiked(userPost.likePostCheck);
    setLikeCount(userPost.likeCount);
  }, [userPost.likePostCheck, userPost.likeCount]);
  const onClickLike = async () => {
    try {
      if (isLiked === true) {
        await axios.get(`/api/member/likedpost/${params.id}`, {
          withCredentials: true,
          headers: {
            Authorization: token,
          },
        });
        setIsLiked(false);
        setLikeCount(likeCount > 0 ? likeCount - 1 : 0);
      }
      if (isLiked === false) {
        await axios.get(`/api/member/likedpost/${params.id}`, {
          withCredentials: true,
          headers: {
            Authorization: token,
          },
        });
        setIsLiked(true);
        setLikeCount(likeCount + 1);
      }
    } catch (err) {
      console.error('좋아요 오류', err);
    }
  };
  return (
    <>
      {loading ? (
        '로딩중...'
      ) : (
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
          <div className='flex items-center gap-1 text-base '>
            {isLiked ? (
              <IoMdHeart size={20} color='red' onClick={onClickLike} className='hover:cursor-pointer' />
            ) : (
              <IoMdHeartEmpty size={20} color='red' onClick={onClickLike} className='hover:cursor-pointer' />
            )}
            좋아요 {likeCount}
            <FaRegCommentDots size={18} />
            댓글 {userPost.commentCount}
          </div>
          {/* 경계선 */}
          <div className='my-4 border-b-2' />
          <Comments />
          <CommentWrite />
        </div>
      )}
    </>
  );
}
