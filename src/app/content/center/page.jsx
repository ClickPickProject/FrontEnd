'use client';
import NoticePostList from '@/components/NoticePostList';
import { motion } from 'framer-motion';
export default function CenterPage() {
  return (
    <>
      <section className='flex h-full w-[inherit] flex-col justify-center'>
        <motion.nav
          className='menu'
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className='flex flex-col gap-2 p-2'>
            <h2 className='text-2xl font-bold'>⭐ 소통센터</h2>
            <p className='mb-4 text-sm opacity-50'>개선사항을 함께 얘기해보세요.</p>
          </div>
          {/* 경계선 */}
          <div className='mb-10 border border-pink-200' />
          <NoticePostList />
        </motion.nav>
      </section>
    </>
  );
}
