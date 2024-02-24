'use client';
import SideNavbar from '@/components/Community/SideNavbar';
import { motion } from 'framer-motion';
import BestLikePost from '@/components/Community/BestPost';
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
          <div className='p-2'>
            <h2 className='text-2xl font-bold'>💞 BEST 좋아요</h2>
            <p className='mb-8 text-sm opacity-50'>가장 많은 좋아요를 받은 게시글이에요.</p>
          </div>
          <div className='flex w-full justify-center gap-10'>
            <BestLikePost />
            <BestLikePost />
            <BestLikePost />
          </div>
        </motion.nav>
      </section>
    </>
  );
}
