import Image from 'next/image';
import { MdPlace } from 'react-icons/md';
import HomePostView from '@/components/HomePostView';
import HomeNavbar from '@/components/HomeNavbar';
import styled from './Home.module.scss';
export default function Home() {
  return (
    <>
      <div className='min-h-screen bg-[#fdf4f5]'>
        <HomeNavbar />
        <main className=''>
          <section
            className='
           mx-auto mb-[30px] mt-[67px] flex flex-col items-center justify-center font-bold  '
          >
            <p className='text-[24px] text-pink-500 md:text-[16px]'>우리가 직접 현장을 눈에 담아봐요</p>
            <p className='text-[48px] md:text-[24px]'>
              웹에서 <span className='text-indigo-400'>추억</span>을 공유해보세요
            </p>
            <p className='text-[48px] md:text-[24px]'>
              원하는 <span className='text-pink-400'>핫플레이스</span>, 더욱 확실하게
            </p>
          </section>
          <div className='m-auto flex h-[60px] w-[200px] flex-col justify-center gap-[10px] rounded-lg border bg-pink-500 font-bold text-white md:h-[50px] md:w-[160px]'>
            <button className='flex h-full w-full items-center justify-center gap-2'>
              <MdPlace size={24} />
              탐색하기
            </button>
          </div>
          <section className='m-auto mb-[80px] mt-[50px] flex h-[312px] w-[684px] flex-row items-center gap-20 md:mx-auto md:h-full md:w-full md:flex-col'>
            <HomePostView />
          </section>
          <picture className='relative h-[500px] md:h-[300px]'>
            <Image alt='#' src='/Images/barn.jpg' fill className='object-cover' />
            <div className={`${styled.bgGradientCustom} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}>
              여러분이 경험한 최근 장소를 기록해보세요
            </div>
          </picture>
        </main>
        <footer>
          <div></div>
        </footer>
      </div>
    </>
  );
}
