'use client';
import SideNavbar from '@/components/Community/SideNavbar';
import BestLikePost from '@/components/Community/BestPost';
import PostList from '@/components/Community/PostList';
import { motion } from 'framer-motion';
import { PencilIcon } from '@/components/UI/Icons';
export default function CommunityPage() {
  return (
    <>
      <SideNavbar />
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
            <BestLikePost />
            <BestLikePost />
          </div>
          {/* 경계선 */}
          <div className='mb-10 border border-pink-200' />
          <div className='mb-10 flex gap-4'>
            <div className='ml-4 text-2xl font-bold'>전체</div>
            <select className='rounded-lg bg-pink-200 px-2 py-1 font-semibold outline-none'>
              <option value=''>카테고리 선택</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
            <div className='ml-auto flex w-[100px] items-center justify-center gap-2 rounded-lg bg-pink-400 text-sm font-bold text-white'>
              <PencilIcon color='white' size={18} />글 작성
            </div>
          </div>
          <PostList />
          <PostList />
          <PostList />
          <PostList />
          <PostList />
          <PostList />
          <PostList />
          <PostList />
          <PostList />
          <PostList />
          <PostList />
        </motion.nav>
      </section>
    </>
  );
}
