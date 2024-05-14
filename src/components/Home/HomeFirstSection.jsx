import Link from 'next/link';
import HomeNowPost from './HomeNowPost';
import { usePathname } from 'next/navigation';
import HomeBestPost from './HomeBestPost';
import HomeNavToolBar from './HomeNavTollBar';
import { FillMapIcon } from '@/components/UI/Icons';
export default function HomeFirstSection() {
  return (
    <>
      <HomeNavToolBar />
      <div className='pb-24 sm:pb-0'>
        <section className='mx-auto mb-[30px] mt-[67px] flex flex-col items-center justify-center font-bold'>
          <p className='text-[24px] text-pink-500 md:text-[16px]'>우리가 직접 현장을 눈에 담아봐요</p>
          <p className='text-[48px] md:text-[24px]'>
            웹에서 <span className='text-indigo-400'>추억</span>을 공유해보세요
          </p>
          <p className='text-[48px] md:text-[24px]'>
            원하는 <span className='text-pink-400'>핫플레이스</span>, 더욱 확실하게
          </p>
        </section>
        <div className='m-auto flex h-[60px] w-[200px] flex-col justify-center gap-[10px] rounded-lg border bg-pink-500 font-bold  text-white duration-200 hover:scale-105 hover:bg-pink-600 md:h-[50px] md:w-[160px]'>
          <Link href='/content/community' className='flex h-full w-full items-center justify-center gap-2 text-lg'>
            <FillMapIcon size={24} />
            탐색하기
          </Link>
        </div>
        <section className='m-auto mb-[80px] mt-[50px] flex h-[312px] w-[684px] flex-row items-center gap-20 md:mx-auto md:h-full md:w-full md:flex-col md:px-4 sm:px-4'>
          <div className='flex w-full flex-1 flex-col gap-4'>
            <div>
              <div className='flex flex-col gap-4'>
                <h2 className='text-2xl font-bold'>💕 BEST 좋아요</h2>
                <HomeBestPost />
              </div>
            </div>
          </div>
          {/* 실시간 게시글 */}
          <div className='flex w-full flex-1 flex-col '>
            <div>
              <h2 className='mb-5 text-2xl font-bold '>💬 실시간 게시글</h2>
              <ul className='flex w-full flex-col gap-[12px]'>
                <HomeNowPost />
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
