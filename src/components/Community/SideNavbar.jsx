import Image from 'next/image';
import Link from 'next/link';
import { AiFillMessage } from 'react-icons/ai';
import { BiMap } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { GoQuestion } from 'react-icons/go';
import { IoNotificationsOutline } from 'react-icons/io5';
import { RiLogoutBoxRLine } from 'react-icons/ri';

export default function SideNavbar() {
  return (
    <>
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
    </>
  );
}
