'use client';
import Image from 'next/image';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { FcLike } from 'react-icons/fc';
import { FaMedal } from 'react-icons/fa6';
import SideNavbar from '@/components/Community/SideNavbar';
import { motion } from 'framer-motion';
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
            <div className='flex flex-col border-2'>
              <figure className='relative'>
                <FaMedal size={32} color='#FACC14' className='absolute' />
                <Image alt='#' src='/sakura.jpg' width={250} height={150} className='h-[150px] w-[250px] rounded-lg' />
              </figure>
              <h2 className='text-sm font-bold'>신전 앞에 봄바람과 춤추는 꽃잎... [129]</h2>
              <span className='flex items-center text-sm font-bold'>
                <Image
                  alt='#'
                  src='/Images/barn.jpg'
                  width={24}
                  height={24}
                  className='h-[24px] w-[24px] rounded-full border-2 border-gray-300 object-cover'
                />
                이름이 긴 닉네임입니다 · <span className='opacity-50'>3일 전</span>
              </span>
              <div className='flex items-center font-semibold'>
                <div className='flex items-center gap-1'>
                  <MdOutlineRemoveRedEye />
                  <span className='pl-1'>1048</span>
                  <FcLike className='opacity-50' />
                  <span className='pl-1'>986</span>
                </div>
              </div>
            </div>
          </div>
        </motion.nav>
      </section>
    </>
  );
}
