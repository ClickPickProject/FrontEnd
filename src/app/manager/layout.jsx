'use client';
import { FillNoticeIcon } from '@/components/UI/Icons';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { BiLogOut } from 'react-icons/bi';
import { FaUsers } from 'react-icons/fa';
import { IoHome, IoMenu } from 'react-icons/io5';
import { PiSirenFill } from 'react-icons/pi';
export default function layout({ children }) {
  const pathname = usePathname();

  const navStyle = `flex cursor-pointer items-center gap-4 rounded-2xl px-4 py-4 text-gray-500 hover:bg-pink-200 hover:text-pink-600 transition-all`;

  const MENU = [
    {
      name: '홈',
      href: '/manager',
      icon: <IoHome size={20} />,
      clickedIcon: 'Home',
    },
    {
      name: '공지사항',
      href: '/manager/notifications',
      icon: <FillNoticeIcon size={20} />,
      clickedIcon: 'Notice',
    },
    {
      name: '사용자 관리',
      href: '/manager/users',
      icon: <FaUsers size={20} />,
      clickedIcon: 'User',
    },
    {
      name: '신고자 관리',
      href: '/manager/reporters',
      icon: <PiSirenFill size={20} />,
      clickedIcon: 'Report',
    },
  ];
  return (
    <>
      <div className='flex min-h-screen bg-white'>
        <div className={`w-[84px] bg-white shadow-xl`}>
          {/* <div className={`w-72 bg-white shadow-xl`}> */}
          {/* Nav */}
          <nav className='flex h-full flex-col justify-between px-4'>
            <figure className='my-4 flex justify-center'>
              <Link alt='logo' href='/'>
                <Image src={'/Images/clickpick_icon.png'} alt='clickpick' width={32} height={32} />
              </Link>
            </figure>
            <ul className='flex flex-col gap-2 font-semibold [&>li]:pl-8 [&>li]:text-gray-500'>
              {MENU.map(({ name, href, icon, clickedIcon }) => (
                <Link key={href} href={href} title={name}>
                  <li className={`${navStyle} ${pathname === href && 'bg-pink-200 text-pink-600'}`}>{icon}</li>
                </Link>
              ))}
            </ul>
            <div
              className='mb-4 mt-auto flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl px-4 py-4 transition-all hover:bg-pink-300 [&>button]:hover:text-red-600'
              title='로그아웃'
            >
              <button className='flex items-center justify-center gap-2 font-semibold text-red-500'>
                <BiLogOut size={20} />
                {/* 로그아웃 */}
              </button>
            </div>
          </nav>
        </div>
        <div className='w-full'>{children}</div>
      </div>
    </>
  );
}
