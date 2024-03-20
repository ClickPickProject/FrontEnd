'use client';
import { FillNoticeIcon } from '@/components/UI/Icons';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { IoHome } from 'react-icons/io5';
import { PiSirenFill } from 'react-icons/pi';
export default function layout({ children }) {
  const pathname = usePathname();
  const [users, setUsers] = useState([
    { id: 1, username: 'admin1', email: 'admin1@example.com' },
    { id: 2, username: 'admin2', email: 'admin2@example.com' },
    { id: 3, username: 'admin3', email: 'admin3@example.com' },
  ]);

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };
  const navStyle = `flex cursor-pointer items-center gap-4 rounded-xl px-8 py-4 text-gray-500 hover:bg-pink-200 hover:text-pink-600 transition-all`;

  const MENU = [
    {
      name: '홈',
      href: '/manager',
      icon: <IoHome size={20} />,
      clickedIcon: '',
    },
    {
      name: '공지사항',
      href: '/manager/notifications',
      icon: <FillNoticeIcon size={20} />,
      clickedIcon: '',
    },
    {
      name: '사용자 관리',
      href: '/manager/users',
      icon: <FaUsers size={20} />,
      clickedIcon: '',
    },
    {
      name: '신고자 관리',
      href: '/manager/reporters',
      icon: <PiSirenFill size={20} />,
      clickedIcon: '',
    },
  ];
  return (
    <>
      <div className='flex min-h-screen bg-gray-100'>
        <div className='w-72 bg-white shadow'>
          <figure className='flex w-full pl-8'>
            <Link alt='logo' href='/'>
              <Image src={'/Images/clickpick_logo.png'} alt='#' width={170} height={80} />
            </Link>
          </figure>
          {/* Nav */}
          <nav className='mt-4 px-5'>
            <ul className='flex flex-col gap-2 font-semibold [&>li]:pl-8 [&>li]:text-gray-500'>
              {MENU.map(({ name, href, icon }) => (
                <Link key={href} href={href}>
                  <li className={`${navStyle} ${pathname === href && 'bg-pink-200 text-pink-600'}`}>
                    {icon} {name}
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
          {/* <div className='mt-8 flex items-center gap-4 pl-8'>
            <img
              className='h-10 w-10 rounded-full border-2 border-pink-500'
              src='https://i.namu.wiki/i/vDDaVK4wm1-vPZgAOI65rbhLhr1vPCzBgoRKSS7mEFx4IH2vtHvvMN41Umw-taptksIW_WqnjwOdcGbAMpAmrQ.webp'
              alt='Profile'
            />
            <button className='mr-4 rounded-md bg-gray-200 px-4 py-2 font-semibold text-gray-800 hover:bg-gray-300'>
              시스템 설정
            </button>
          </div> */}
        </div>
        {children}
      </div>
    </>
  );
}
