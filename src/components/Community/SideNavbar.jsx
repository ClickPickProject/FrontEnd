'use client';
import Image from 'next/image';
import Link from 'next/link';
import { CgMenu, CgMenuLeft } from 'react-icons/cg';
import { motion } from 'framer-motion';
import {
  FillMapIcon,
  FillMessageIcon,
  FillNoticeIcon,
  FillProfileIcon,
  FillQuestionIcon,
  LogoutIcon,
  MapIcon,
  MessageIcon,
  NoticeIcon,
  ProfileIcon,
  QuestionIcon,
} from '@/components/UI/Icons';
import { usePathname } from 'next/navigation';
import { loginState, tokenState } from '@/atoms/tokenState';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';

export default function SideNavbar() {
  const pathName = usePathname();
  const token = useRecoilValue(tokenState);
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  const onClickLogout = () => {
    toast.success('로그아웃 되었습니다.', {
      position: 'top-right',
    });
    localStorage.clear();
    setIsLogin(false);
    window.location.reload();
  };

  useEffect(() => {
    localStorage.getItem('token') ? setIsLogin(true) : setIsLogin(false);
  }, [token]);

  const [showDis, setShowDis] = useState(false);

  const handleClick = () => {
    setShowDis((show) => !show);
  };

  const MENU = [
    {
      name: '장소찾기',
      href: '/place',
      icon: <MapIcon size={28} />,
      clickedIcon: <FillMapIcon size={28} color='#ec4899' />,
    },
    {
      name: '공지사항',
      href: '/content/notice',
      icon: <NoticeIcon size={28} />,
      clickedIcon: <FillNoticeIcon size={28} color='#ec4899' />,
    },
    {
      name: '커뮤니티',
      href: '/content/community',
      icon: <MessageIcon size={28} />,
      clickedIcon: <FillMessageIcon size={28} color='#ec4899' />,
    },
    {
      name: '소통센터',
      href: '/content/center',
      icon: <QuestionIcon size={28} />,
      clickedIcon: <FillQuestionIcon size={28} color='#ec4899' />,
    },
  ];

  const sideNavbarVariants = {
    hidden: {
      x: '-2%',
      opacity: 1,
    },
    visible: {
      x: '0%',
      opacity: 1,
    },
  };

  return (
    <>
      <figure className='hidden'>
        <Image src={'/Images/clickpick_logo.png'} alt='#' width={168} height={76} />
      </figure>
      <div>
        {showDis ? (
          <>
            <div className={`w-full bg-white p-2 sm:flex sm:items-center sm:bg-pink-300`}>
              <button onClick={handleClick} className='transition-all hover:text-pink-500'>
                <CgMenuLeft size={24} />
              </button>
              <figure className='mx-auto'>
                <Image src={'/Images/clickpick_logo.png'} alt='#' width={100} height={100} />
              </figure>
            </div>
          </>
        ) : (
          <div className={`hidden w-full bg-white p-2 sm:flex sm:items-center sm:bg-pink-200`}>
            <button onClick={handleClick} className='transition-all hover:text-pink-500'>
              <CgMenuLeft size={24} />
            </button>
            <figure className='mx-auto'>
              <Image src={'/Images/clickpick_logo.png'} alt='#' width={100} height={100} />
            </figure>
          </div>
        )}
        <div
          className={`bg-gray-500 ${showDis ? 'fixed inset-0 z-40 opacity-30' : 'pointer-events-none opacity-0'}`}
          onMouseDown={() => setShowDis(false)}
        />
        <motion.div
          className={`${showDis ? 'z-50 bg-opacity-30 sm:fixed sm:top-0 sm:h-full  sm:bg-white' : 'sm:hidden '}`}
          variants={sideNavbarVariants}
          initial='hidden'
          animate={showDis ? 'visible' : 'hidden'}
        >
          <div className='mr-8 sm:mr-0'>
            <header className='mb-8 w-full sm:mb-2'>
              <figure className='ml-4'>
                <Link alt='logo' href='/'>
                  <Image src={'/Images/clickpick_logo.png'} alt='#' width={168} height={76} />
                </Link>
              </figure>
            </header>
            <nav className='sticky top-0 mb-6 flex w-[220px] flex-col items-center sm:px-4'>
              <ul className='flex w-full flex-col gap-[13px] text-sm sm:gap-[6px] sm:text-xs [&>*]:h-[50px] [&>*]:pl-4 [&>*]:font-bold sm:[&>*]:pl-0'>
                {MENU.map(({ name, href, icon, clickedIcon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`flex rounded-2xl hover:bg-pink-100 sm:justify-center ${href === pathName || (pathName.startsWith('/content/community') && href === '/content/community') ? 'bg-pink-100' : null} transition-all active:bg-pink-200`}
                  >
                    <li className='flex items-center gap-2'>
                      {href === pathName ? clickedIcon : icon} {name}
                    </li>
                  </Link>
                ))}
              </ul>
            </nav>
          </div>
          <div className='sticky top-[calc(239px+24px)] flex w-full items-center gap-5 pb-4 sm:static sm:justify-center [&>*]:rounded-xl [&>*]:text-xs sm:[&>*]:text-[10px]'>
            <Link
              href='/content/profile'
              className={`${
                pathName === '/content/profile' ? 'bg-pink-300' : null
              } flex h-[40px] w-[100px] items-center justify-center gap-1 whitespace-nowrap bg-pink-100 px-3 py-2 font-bold transition-all hover:bg-pink-300 sm:w-[80px]`}
            >
              {pathName === '/content/profile' ? (
                <FillProfileIcon size={28} color='#ec4899' />
              ) : (
                <ProfileIcon size={28} />
              )}
              내 정보
            </Link>

            {isLogin ? (
              <button
                onClick={onClickLogout}
                className='flex  h-[40px] w-[100px] items-center justify-center gap-1 whitespace-nowrap bg-pink-100 px-3 py-2 font-bold transition-all hover:bg-pink-300 sm:w-[80px]'
              >
                <LogoutIcon size={24} />
                로그아웃
              </button>
            ) : (
              <Link
                href='/login'
                className='flex h-[40px] w-[100px] items-center justify-center gap-1 whitespace-nowrap bg-pink-100 px-3 py-2 font-bold transition-all hover:bg-pink-300 sm:w-[80px]'
              >
                <LogoutIcon size={24} />
                로그인
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}
