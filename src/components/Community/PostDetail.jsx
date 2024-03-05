'use client';
import StatusView from './BestPost/StatusView';
import WriterView from './BestPost/WriterView';
import { IoMdHeartEmpty } from 'react-icons/io';
import { FaRegCommentDots } from 'react-icons/fa6';
import { useEffect, useId, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import HashtagView from './HashtagView';

export default function PostDetail() {
  const params = useParams();
  dayjs.locale('ko');
  const now = dayjs();
  const formattedDate = now.format('YY-MM-DD dddd HH:mm:ss');

  const [userPost, setUserPost] = useState({
    nickname: '',
    title: '',
    content: '',
    date: '',
    likeCount: 0,
    viewCount: 0,
    position: '',
    photoDate: '',
    hashTags: [''],
  });
  useEffect(() => {
    const postListFetch = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_LOCAL_API_URL}/posts/${params.id}`);
        if (res.status === 200) {
          setUserPost({
            nickname: res.data.userId,
            title: res.data.title,
            content: res.data.content,
            date: now.format('YY-MM-DD dddd HH:mm:ss'),
            likeCount: 0,
            viewCount: 0,
            hashTags: res.data.hashtag,
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    postListFetch();
  }, [params, now]);

  return (
    <>
      <div className='w-full'>
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
          <HashtagView tags={userPost.hashTags} />
        </div>
        <div className='flex items-center gap-1'>
          <IoMdHeartEmpty size={18} color='red' />
          좋아요 {userPost.likeCount}
          <FaRegCommentDots size={18} />
          댓글 2
        </div>
        {/* 경계선 */}
        <div className='mb-8 mt-4 border-b-2' />
        <div className=''>
          <ul>
            <li className='flex flex-col gap-1'>
              <WriterView writer={userPost.nickname} />
              <div>그렇군요...</div>
              <div className='text-sm font-semibold opacity-50'>답글</div>
              <div className='border' />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
