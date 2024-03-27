import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { loginState } from '@/atoms/tokenState';
import { PencilIcon } from '@/components/UI/Icons';
import { useRecoilValue } from 'recoil';
import PostList from '@/components/Profile/MyPost/PostList';
export default function MyPostList() {
  const [category, setCategory] = useState('');
  const isLogin = useRecoilValue(loginState);
  return (
    <>
      <section className=' flex h-full w-[inherit] flex-col justify-center'>
        <motion.nav
          className='menu'
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className='mb-10 flex gap-4'>
            <div className='text-2xl font-bold'>❤️ 좋아요한 댓글</div>
            <div className='mb-10 border border-pink-200' />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='rounded-lg bg-pink-200 px-2 py-1 font-semibold outline-none transition-all hover:cursor-pointer hover:bg-pink-300'
            >
              <option value='모두'>모두</option>
              <option value='자유'>자유</option>
              <option value='음식'>음식</option>
              <option value='여행지'>여행지</option>
            </select>
            <Link
              href={`${isLogin ? '/content/community/write' : '/login'}`}
              className='ml-auto flex w-[100px] items-center justify-center gap-2 rounded-lg bg-pink-400 text-sm font-bold text-white transition-all hover:bg-pink-500'
            >
              <PencilIcon color='white' size={18} />글 작성
            </Link>
          </div>

          <PostList category={category} url={'/api/member/liked/comment/list'} />
        </motion.nav>
      </section>
    </>
  );
}
