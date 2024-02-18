'use client';
import { MdOutlineMailOutline } from 'react-icons/md';
import { SiNamecheap } from 'react-icons/si';
import { RiLockPasswordLine } from 'react-icons/ri';
import Image from 'next/image';
import Link from 'next/link';
export default function SignUpPage() {
  const defaultInputStyle = 'rounded-lg outline-none h-[45px] pl-7';

  return (
    <>
      <div className='h-[100dvh] bg-[#fdf4f5]'>
        <section className='absolute left-1/2 top-1/2 flex h-[700px] w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col  rounded-2xl  bg-pink-200  shadow-[1px_1px_200px_1px] shadow-pink-200'>
          <figure className='mx-auto p-6'>
            <Image src='/Images/clickpick_icon.png' alt='' width={52} height={52} />
          </figure>
          <h2 className='mx-auto mb-8 text-2xl font-bold'>클릭픽 회원가입</h2>
          <form className='j flex w-full flex-col items-center justify-center gap-4'>
            <div className='relative flex w-[350px] flex-col'>
              <MdOutlineMailOutline
                size={20}
                className='absolute ml-1 flex h-full items-center justify-center  opacity-50'
              />
              <input placeholder='아이디' type='text' id='id' required className={`${defaultInputStyle}`} />
            </div>
            {/* <div className='flex w-[350px] font-semibold text-red-600'>아이디는 4~12자 이내로 입력해주세요</div> */}
            <div className='flex w-[350px] font-semibold text-blue-600'>사용할 수 있는 아이디입니다.</div>
            <div className='relative flex w-[350px] flex-col'>
              <RiLockPasswordLine
                size={20}
                className='absolute ml-1 flex h-full items-center justify-center opacity-50'
              />
              <input placeholder='비밀번호' type='password' id='password' required className={`${defaultInputStyle}`} />
            </div>
            {/* <div className='flex w-[350px] font-semibold text-red-600'>
              영문과 숫자를 포함하여 6자 이상 입력해주세요
            </div> */}
            <div className='flex w-[350px] font-semibold text-blue-600'>사용할 수 있는 비밀번호입니다.</div>
            <div className='relative flex w-[350px] flex-col'>
              <RiLockPasswordLine
                size={20}
                className='absolute ml-1 flex h-full items-center justify-center opacity-50'
              />
              <input
                placeholder='비밀번호 확인'
                type='password'
                id='password'
                required
                className={`${defaultInputStyle}`}
              />
            </div>
            {/* <div className='flex w-[350px] font-semibold text-red-600'>비밀번호가 서로 일치하지 않습니다.</div> */}
            <div className='flex w-[350px] font-semibold text-blue-600'>비밀번호가 서로 일치합니다.</div>
            <div className='relative flex w-[350px] flex-col'>
              <SiNamecheap size={20} className='absolute ml-1 flex h-full items-center justify-center opacity-50' />
              <input placeholder='닉네임' type='text' id='password' required className={`${defaultInputStyle}`} />
            </div>
            {/* <div className='flex w-[350px] font-semibold text-red-600'>이미 사용중인 닉네임입니다.</div> */}
            <div className='flex w-[350px] font-semibold text-blue-500'>사용 가능한 닉네임입니다.</div>
            <div className='flex justify-center'>
              <button className='flex h-[45px] w-[350px]  items-center justify-center rounded-lg bg-pink-400 text-xl font-semibold text-white transition-all hover:bg-pink-500 hover:text-white'>
                가입하기
              </button>
            </div>
            <div className='flex text-gray-600 '>
              이미 회원이신가요?
              <button className='pl-2 font-semibold text-black'>
                <Link href='/login'>로그인</Link>
              </button>
            </div>
            {/* <div>소셜 회원가입</div> */}
          </form>
        </section>
      </div>
    </>
  );
}
