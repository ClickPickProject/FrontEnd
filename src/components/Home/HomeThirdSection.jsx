import Image from 'next/image';
export default function HomeThirdSection() {
  return (
    <figure className='relative h-dvh md:h-[300px]'>
      <Image alt='#' src='/Images/cloud.jpg' fill className='object-cover opacity-40' />
      <section className='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-20 font-bold'>
        <figure className='flex h-[full] w-[1400px] flex-1 items-center md:h-[300px]'>
          <Image alt='#' src='/Images/iphone.png' width={1400} height={700} />
        </figure>
        <div className='flex flex-1 flex-col'>
          <p className='text-[24px] text-pink-500 md:text-[16px]'>우리가 직접 현장을 눈에 담아봐요</p>
          <p className='text-[48px] md:text-[24px]'>
            웹에서 <span className='text-indigo-400'>추억</span>을 공유해보세요
          </p>
          <p className='text-[48px] md:text-[24px]'>
            원하는 <span className='text-pink-400'>핫플레이스</span>, 더욱 확실하게
          </p>
        </div>
      </section>
    </figure>
  );
}
