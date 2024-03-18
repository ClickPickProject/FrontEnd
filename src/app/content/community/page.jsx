'use client';
import BestLikePost from '@/components/Community/BestPost';
import PostList from '@/components/Community/PostList';
import { motion } from 'framer-motion';
import { PencilIcon } from '@/components/UI/Icons';
import Link from 'next/link';
import { useState } from 'react';
import AuthContext from '@/components/context/AuthContext';
function CommunityPage() {
  const [category, setCategory] = useState('');
  const onChangeOptions = (e) => {
    setCategory(e.target.value);
  };
  return (
    <>
      <section className='flex flex-col'>
        <motion.nav
          className='menu'
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className='flex flex-col gap-2 p-2'>
            <h2 className='text-2xl font-bold'>💞 BEST 좋아요</h2>
            <p className='mb-4 text-sm opacity-50'>가장 많은 좋아요를 받은 게시글이에요.</p>
          </div>
          <div className='mb-10 flex w-full justify-center gap-10'>
            <BestLikePost />
          </div>
          {/* 경계선 */}
          <div className='mb-10 border border-pink-200' />
          <div className='mb-10 flex gap-4'>
            <div className='text-2xl font-bold'>게시글</div>
            <select
              value={category}
              onChange={onChangeOptions}
              className='rounded-lg bg-pink-200 px-2 py-1 font-semibold outline-none transition-all hover:cursor-pointer hover:bg-pink-300'
            >
              <option value='모두'>모두</option>
              <option value='자유'>자유</option>
              <option value='음식'>음식</option>
              <option value='여행지'>여행지</option>
            </select>
            <Link
              href='/content/community/write'
              className='ml-auto flex w-[100px] items-center justify-center gap-2 rounded-lg bg-pink-400 text-sm font-bold text-white transition-all hover:bg-pink-500'
            >
              <PencilIcon color='white' size={18} />글 작성
            </Link>
          </div>
          <PostList category={category} />
        </motion.nav>
      </section>
    </>
  );
}

export default AuthContext(CommunityPage, { adminRequired: false });
