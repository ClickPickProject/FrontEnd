import HomeNavbar from '@/components/Home/HomeNavbar';
import { MdOutlineMailOutline } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import Image from 'next/image';
import Link from 'next/link';
export default function SignUpPage() {
  const defaultInputStyle = 'rounded-md outline-none h-[50px] text-lg pl-8';

  return (
    <>
      <div className='h-[100dvh] bg-[#fdf4f5]'>
        <HomeNavbar />
        <section className='absolute left-1/2 top-1/2 flex h-[700px] w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col  rounded-2xl  bg-pink-200  shadow-[1px_1px_200px_1px] shadow-pink-200'>
          <figure className='mx-auto p-8'>
            <Image src='/Images/clickpick_icon.png' alt='' width={52} height={52} />
          </figure>
          <h2 className='mx-auto mb-8 text-4xl font-bold'>클릭픽 회원가입</h2>
          <form className='flex w-full flex-col items-center justify-center gap-12'>
            <div className='relative flex w-[400px] flex-col'>
              <MdOutlineMailOutline
                size={24}
                className='absolute ml-1 flex h-full items-center justify-center opacity-50'
              />
              <input placeholder='아이디' type='text' id='id' required className={`${defaultInputStyle}`} />
            </div>
            <div className='relative flex w-[400px] flex-col'>
              <RiLockPasswordLine
                size={24}
                className='absolute ml-1 flex h-full items-center justify-center opacity-50'
              />
              <input placeholder='비밀번호' type='password' id='password' required className={`${defaultInputStyle}`} />
            </div>
            <div className='relative flex w-[400px] flex-col'>
              <RiLockPasswordLine
                size={24}
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
            <div className='flex justify-center'>
              <button className='flex h-[50px] w-[400px]  items-center justify-center rounded-lg bg-pink-400 text-2xl font-semibold text-white transition-all hover:bg-pink-500 hover:text-white'>
                가입하기
              </button>
            </div>
            <div className='flex text-gray-600 '>
              이미 회원이신가요?
              <div className='pl-2 font-semibold text-black'>
                <Link href='/login' className=''>
                  로그인
                </Link>
              </div>
            </div>
            <div>소셜 회원가입</div>
          </form>
        </section>
      </div>
    </>
  );
}
