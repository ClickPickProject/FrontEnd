'use client';
import Image from 'next/image';

export default function MyProfile() {
  return (
    <>
      <aside className='absolute right-1/2 flex h-full w-[550px] flex-col justify-around bg-pink-200'>
        <figure className='relative mx-auto'>
          <Image src='/Images/clickpick_logo.png' alt='' width={100} height={100} />
        </figure>
        <div className='flex- flex w-10/12 flex-col gap-5 text-center'>
          <div className='h-16 rounded-l-lg bg-white shadow-md'>gd</div>
          <div className='h-16 rounded-l-lg bg-white shadow-md'>gd</div>
          <div className='h-16 rounded-l-lg bg-white  shadow-md'>gd</div>
        </div>
        <div className=' relative mx-auto flex w-10/12 justify-center bg-white'> 회원 탈퇴 </div>
      </aside>
      <section>
        <div className='mx-30 absolute'>마이프로필</div>
      </section>
    </>
  );
}
