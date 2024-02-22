import Image from 'next/image';
import Link from 'next/link';
import { BiMap } from 'react-icons/bi';
import { GoQuestion } from 'react-icons/go';
import { CgProfile } from 'react-icons/cg';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { AiFillMessage } from 'react-icons/ai';
import { IoNotificationsOutline } from 'react-icons/io5';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { FcLike } from 'react-icons/fc';
import { FaMedal } from 'react-icons/fa6';
export default function CommunityPage() {
  return (
    <>
      <div className='mx-auto flex h-[100dvh] max-w-5xl bg-white'>
        <div className='mr-8'>
          <header className='w-full'>
            <figure className='ml-4'>
              <Link alt='logo' href='/'>
                <Image src={'/Images/clickpick_logo.png'} alt='#' width={168} height={76} />
              </Link>
            </figure>
          </header>
          <nav className='flex h-[289px] w-[220px] items-center'>
            <ul className='flex w-full flex-col gap-[13px] text-sm [&>li]:h-[50px] [&>li]:pl-4 [&>li]:font-bold'>
              <li className='flex items-center gap-2 '>
                <BiMap size={28} />
                장소찾기
              </li>
              <li className='flex items-center gap-2 '>
                <IoNotificationsOutline size={28} />
                공지사항
              </li>
              <li className='flex items-center gap-2 rounded-2xl bg-pink-100 '>
                <AiFillMessage size={28} className='text-pink-500' />
                커뮤니티
              </li>
              <li className='flex items-center gap-2'>
                <GoQuestion size={28} />
                소통센터
              </li>
            </ul>
          </nav>
          <div className='flex w-full justify-center gap-5  [&>div]:rounded-xl [&>div]:text-xs'>
            <div className='flex h-[40px] w-[100px] items-center justify-center gap-1 bg-pink-100 px-3 py-2 font-bold'>
              <CgProfile size={24} />내 정보
            </div>
            <div className='flex h-[40px] w-[100px] items-center gap-1 bg-pink-100 px-3 py-2 font-bold'>
              <RiLogoutBoxRLine size={24} />
              로그아웃
            </div>
          </div>
        </div>
        <section className='flex flex-col'>
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
        </section>
      </div>
    </>
  );
}
