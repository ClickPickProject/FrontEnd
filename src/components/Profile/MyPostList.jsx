import { useState } from 'react';
import Link from 'next/link';
import { loginState } from '@/atoms/tokenState';
import { PencilIcon } from '@/components/UI/Icons';
import { useRecoilValue } from 'recoil';
export default function MyPostList() {
  const [category, setCategory] = useState('');
  const isLogin = useRecoilValue(loginState);
  return (
    <>
      <section className='flex h-full w-[inherit] flex-col justify-center'>
        <div className='flex flex-col gap-2 p-2'>
          <h2 className='text-2xl font-bold'>📋 나의 게시글</h2>
          <p className='mb-4 text-sm opacity-50'>내가 작성한 게시글이에요.</p>
        </div>
      </section>
      <div className='mb-10 flex w-full justify-center gap-10'></div>
      <div className='mb-10 border border-pink-200' />
      <div className='mb-10 flex gap-4'>
        <div className='text-2xl font-bold'>게시글</div>

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
    </>
  );
}
