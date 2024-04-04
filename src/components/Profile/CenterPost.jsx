import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { loginState } from '@/atoms/tokenState';
import { PencilIcon } from '@/components/UI/Icons';
import { useRecoilValue } from 'recoil';
import PostList from '@/components/Profile/MyPost/PostList';
import NoticePostList from '../NoticePostList';
export default function CenterPost() {
  const isLogin = useRecoilValue(loginState);
  return (
    <>
      <section className=' flex h-full w-[inherit] flex-col justify-center sm:mt-10'>
        <motion.nav
          className='menu'
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className='mb-10 flex gap-4 sm:mr-[40px] sm:gap-2'>
            <div className='whitespace-nowrap text-2xl font-bold sm:text-xl'>🙋🏻‍♀️ 나의소통</div>
            <div className='mb-10 border border-pink-200' />
          </div>

          <NoticePostList url={'/api/member/post/list'} />
        </motion.nav>
      </section>
    </>
  );
}
