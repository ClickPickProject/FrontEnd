'use client';
import LikeComment from '@/components/Profile/LikeComment';
import LikePost from '@/components/Profile/LikePost';
import MyCommentList from '@/components/Profile/MyCommentList';
import MyPostList from '@/components/Profile/MyPostList';
import MyProfile from '@/components/Profile/MyProfile';
import { useState } from 'react';
export default function ProfilePage() {
  const hoverStyle =
    'hover:border-b-2 hover:border-pink-400 hover:text-pink-400 border-b-2 border-transparent t pb-1 transition-all';
  const [activeSection, setactiveSection] = useState(1);
  const handleSectionChange = (e) => {
    setactiveSection(e);
  };

  return (
    <>
      <div className='flex w-full flex-col'>
        <ul className='mx-auto my-5 flex h-12 space-x-8 font-semibold'>
          <li className={hoverStyle} onClick={() => handleSectionChange(1)}>
            🙋‍♂️ 마이 프로필
          </li>
          <li onClick={() => handleSectionChange(2)} className={hoverStyle}>
            📋 나의 게시글
          </li>
          <li onClick={() => handleSectionChange(3)} className={hoverStyle}>
            💬 나의 댓글
          </li>
          <li onClick={() => handleSectionChange(4)} className={hoverStyle}>
            ❤️ 좋아요한 게시글
          </li>
          <li onClick={() => handleSectionChange(5)} className={hoverStyle}>
            ❤️ 좋아요한 댓글
          </li>
        </ul>
        {activeSection === 1 && <MyProfile />}
        {activeSection === 2 && <MyPostList />}
        {activeSection === 3 && <MyCommentList />}
        {activeSection === 4 && <LikePost />}
        {activeSection === 5 && <LikeComment />}
      </div>
    </>
  );
}
