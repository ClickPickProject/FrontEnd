'use client';
import StatusView from './BestPost/StatusView';
import WriterView from './BestPost/WriterView';
import { IoMdHeartEmpty } from 'react-icons/io';
import { FaRegCommentDots } from 'react-icons/fa6';
import { useParams } from 'next/navigation';
import HashtagView from './HashtagView';
import { useRecoilValue } from 'recoil';
import { postSelectorFamily } from '@/atoms/PostState';
export default function PostDetail() {
  const params = useParams();
  const userPost = useRecoilValue(postSelectorFamily(params.id));

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
          <HashtagView tags={userPost.hashtag} />
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
