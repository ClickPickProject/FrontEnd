'use client';
import LikeComment from '@/components/Profile/LikeComment';
import LikePost from '@/components/Profile/LikePost';
import MyCommentList from '@/components/Profile/MyCommentList';
import MyPostList from '@/components/Profile/MyPostList';
import MyProfile from '@/components/Profile/MyProfile';
import CenterPost from '@/components/Profile/CenterPost';
import { FaAngleDown } from 'react-icons/fa6';
import { FaAngleUp } from 'react-icons/fa6';
import { useState } from 'react';
export default function ProfilePage() {
  const hoverStyle =
    'hover:border-b-2 hover:border-pink-400 hover:text-pink-400 border-b-2 border-transparent pb-1 transition-all bg-white z-50 w-full cursor-pointer';
  const [activeSection, setActiveSection] = useState(1);
  const handleSectionChange = (e) => {
    setActiveSection(e);
  };

  return (
    <>
      <div className={`flex w-full flex-col `}>
        <div className=' flex justify-center sm:w-full'>
          <ul className='my-2 flex items-center justify-center gap-4 whitespace-nowrap text-base font-semibold lg:flex-col sm:flex-col'>
            <div className='flex w-full justify-center gap-4 text-center lg:gap-12 sm:gap-12'>
              <li onClick={() => handleSectionChange(1)} className={`${hoverStyle} `}>
                🙋‍♂️ 내프로필
              </li>
              <li onClick={() => handleSectionChange(2)} className={`${hoverStyle}`}>
                📋 내게시글
              </li>
              <li onClick={() => handleSectionChange(3)} className={`${hoverStyle}`}>
                💬 나의댓글
              </li>
            </div>
            <div className='flex w-full justify-center gap-4 text-center lg:gap-12 sm:gap-12'>
              <li onClick={() => handleSectionChange(4)} className={`${hoverStyle}`}>
                ❤️ 좋아한게시글
              </li>
              <li onClick={() => handleSectionChange(5)} className={`${hoverStyle}`}>
                ❤️ 좋아한댓글
              </li>
              <li onClick={() => handleSectionChange(6)} className={`${hoverStyle}`}>
                🙋🏻‍♀️ 나의소통
              </li>
            </div>
          </ul>
        </div>
        {activeSection === 1 && <MyProfile />}
        {activeSection === 2 && <MyPostList />}
        {activeSection === 3 && <MyCommentList />}
        {activeSection === 4 && <LikePost />}
        {activeSection === 5 && <LikeComment />}
        {activeSection === 6 && <CenterPost />}
      </div>
    </>
  );
}
