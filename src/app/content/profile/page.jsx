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
  const [showDis, setShowDis] = useState(false);
  const handleClick = () => {
    setShowDis((show) => !show);
  };
  const hoverStyle =
    'hover:border-b-2 hover:border-pink-400 hover:text-pink-400 border-b-2 border-transparent pb-1 transition-all bg-white z-50 w-full cursor-pointer';
  const displayClass = showDis ? 'inline-block' : 'sm:hidden';
  const [activeSection, setActiveSection] = useState(1);
  const handleSectionChange = (e) => {
    setActiveSection(e);
  };

  return (
    <>
      <div className={`flex w-full flex-col `}>
        <div className='mx-auto mb-3 '>
          {showDis ? (
            <div className='hidden p-1 sm:inline' onClick={handleClick}>
              <FaAngleUp />
            </div>
          ) : (
            <div className='hidden p-1 sm:inline' onClick={handleClick}>
              <FaAngleDown />
            </div>
          )}
        </div>
        <div className=' flex justify-center sm:w-full'>
          <ul className='my-5 flex items-center justify-center space-x-8 whitespace-nowrap text-base font-semibold lg:space-x-4 lg:text-sm sm:my-0 sm:flex-col sm:space-x-0 sm:p-3'>
            <li onClick={() => handleSectionChange(1)} className={`${hoverStyle} ${displayClass}`}>
              🙋‍♂️ 내프로필
            </li>
            <li onClick={() => handleSectionChange(2)} className={`${hoverStyle} ${displayClass}`}>
              📋 내게시글
            </li>
            <li onClick={() => handleSectionChange(3)} className={`${hoverStyle} ${displayClass}`}>
              💬 나의댓글
            </li>
            <li onClick={() => handleSectionChange(4)} className={`${hoverStyle} ${displayClass}`}>
              ❤️ 좋아한게시글
            </li>
            <li onClick={() => handleSectionChange(5)} className={`${hoverStyle} ${displayClass}`}>
              ❤️ 좋아한댓글
            </li>
            <li onClick={() => handleSectionChange(6)} className={`${hoverStyle} ${displayClass}`}>
              🙋🏻‍♀️ 나의소통
            </li>
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
