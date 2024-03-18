import Link from 'next/link';
import { MdPlace } from 'react-icons/md';

export default function HomeFirstSection() {
  return (
    <>
      <section className='mx-auto mb-[30px] mt-[67px] flex flex-col items-center justify-center font-bold'>
        <p className='text-[24px] text-pink-500 md:text-[16px]'>우리가 직접 현장을 눈에 담아봐요</p>
        <p className='text-[48px] md:text-[24px]'>
          웹에서 <span className='text-indigo-400'>추억</span>을 공유해보세요
        </p>
        <p className='text-[48px] md:text-[24px]'>
          원하는 <span className='text-pink-400'>핫플레이스</span>, 더욱 확실하게
        </p>
      </section>
      <div className='m-auto flex h-[60px] w-[200px] flex-col justify-center gap-[10px] rounded-lg border bg-pink-500 font-bold text-white md:h-[50px] md:w-[160px]'>
        <Link href='/content/community' className='flex h-full w-full items-center justify-center gap-2 text-lg'>
          <MdPlace size={24} />
          탐색하기
        </Link>
      </div>
    </>
  );
}
