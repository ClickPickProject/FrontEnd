'use client';

import HomePostWriter from './HomePostWriter';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';

import HomeNowPost from './HomeNowPost';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import HomeBestPost from './HomeBestPost';
import { useRecoilValue, useRecoilState } from 'recoil';
import { pageNavModal } from '@/atoms/pageState';
import { userImgState } from '@/atoms/userInfoState';
import { MyNicknameState, tokenState } from '@/atoms/tokenState';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const proImg = useRecoilValue(userImgState);
  const myNickname = useRecoilValue(MyNicknameState);
  const token = useRecoilValue(tokenState);
  const [isLogin, setIsLogin] = useState(false);
  const [NavModal, setNavModal] = useRecoilState(pageNavModal);

  useEffect(() => {
    localStorage.getItem('token') ? setIsLogin(true) : setIsLogin(false);
  }, [token]);
  // 로그아웃
  const onClickLogout = (e) => {
    localStorage.clear();
    setIsLogin(false);
    setNavModal(false);
    toast.success('로그아웃 되었습니다.', {
      position: 'top-right',
    });
  };

  // 메뉴바
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
        <section className='absolute right-4 top-4 z-50 mt-[78px] flex h-[500px] w-[300px] flex-col items-center rounded-2xl bg-pink-200 shadow-2xl sm:w-1/2'>
          <img
            src={proImg}
            alt='프로필 정보'
            className='z-10 mt-6 h-[200px] w-[200px] rounded-full border-4 border-white'
          />
          <p className='mt-2 text-lg font-bold '>{myNickname}</p>
          <div className=' mt-2 flex w-full flex-row  justify-center gap-4'>
            <p className='flex items-center  justify-center gap-1'>
              <Link
                href='/content/profile'
                className='flex h-[40px] w-[100px] items-center justify-center whitespace-nowrap rounded-xl bg-pink-100 p-1 text-sm font-bold hover:bg-pink-300'
              >
                <ProfileIcon size={28} />내 정보
              </Link>
            </p>
            <p className='flex items-center  justify-center gap-1'>
              <button
                onClick={onClickLogout}
                className='flex h-[40px] w-[100px] items-center justify-center whitespace-nowrap rounded-xl bg-pink-100 p-1 text-sm font-bold hover:bg-pink-300'
              >
                <LogoutIcon size={24} />
                로그아웃
              </button>
            </p>
          </div>
          <div className='mt-3 flex flex-col items-center justify-center gap-2'>
            <div className='flex h-[60px] w-[280px] gap-4 rounded-xl '>
              <ul className='flex w-full flex-col gap-[13px] [&>*]:h-[50px] [&>*]:pl-4 [&>*]:font-bold'>
                {MENU.map(({ name, href, icon, clickedIcon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`flex rounded-xl hover:bg-pink-100 ${href === pathName || (pathName.startsWith('/content/community') && href === '/content/community') ? 'bg-pink-100' : null} transition-all active:bg-pink-200`}
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
