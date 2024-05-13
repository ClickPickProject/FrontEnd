'use client';

import HomePostWriter from './HomePostWriter';
import Image from 'next/image';
import Link from 'next/link';
import HomeNowPost from './HomeNowPost';
import { usePathname } from 'next/navigation';
import HomeBestPost from './HomeBestPost';
import { useRecoilValue } from 'recoil';
import { pageNavModal } from '@/atoms/pageState';
import { userImgState } from '@/atoms/userInfoState';
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
export default function HomeNavToolBar() {
  const pathName = usePathname();
  const NavModal = useRecoilValue(pageNavModal);
  const proImg = useRecoilValue(userImgState);
  const onClickLogout = () => {
    localStorage.clear();
    setIsLogin(false);
    toast.success('로그아웃 되었습니다.', {
      position: 'top-right',
    });
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
  return (
    <>
      {!NavModal ? (
        <section className='absolute right-4 top-4 mt-[78px] flex h-[500px] w-[300px] flex-col items-center rounded-2xl bg-pink-200 shadow-2xl'>
          <img src={proImg} alt='#' className='z-10 mt-6 h-[200px] w-[200px] rounded-full' />
          <p className='mt-2 text-lg font-bold '>홍길동</p>
          <div className=' mt-2 flex w-full flex-row  justify-center gap-4'>
            <p className='flex items-center  justify-center gap-1'>
              <Link
                href='/content/profile'
                className='flex h-[40px] w-[100px] items-center justify-center whitespace-nowrap rounded-xl bg-pink-100 p-1 text-sm font-bold'
              >
                <ProfileIcon size={28} />내 정보
              </Link>
            </p>
            <p className='flex items-center  justify-center gap-1'>
              <button
                onClick={onClickLogout}
                className='flex h-[40px] w-[100px] items-center justify-center whitespace-nowrap rounded-xl bg-pink-100 p-1 text-sm font-bold'
              >
                <LogoutIcon size={24} />
                로그아웃
              </button>
            </p>
          </div>
          <div className='mt-3 flex flex-col items-center justify-center gap-2'>
            <div className='flex h-[60px] w-[280px] gap-4 rounded-xl '>
              <ul className='flex w-full flex-col gap-[13px] text-sm sm:gap-[6px] sm:text-xs [&>*]:h-[50px] [&>*]:pl-4 [&>*]:font-bold sm:[&>*]:pl-0'>
                {MENU.map(({ name, href, icon, clickedIcon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`flex rounded-xl hover:bg-pink-100 sm:justify-center ${href === pathName || (pathName.startsWith('/content/community') && href === '/content/community') ? 'bg-pink-100' : null} transition-all active:bg-pink-200`}
                  >
                    <li className='flex items-center gap-2'>
                      {href === pathName ? clickedIcon : icon} {name}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
