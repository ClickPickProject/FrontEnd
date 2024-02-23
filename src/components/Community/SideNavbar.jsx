'use client';
import Image from 'next/image';
import Link from 'next/link';
import {
  FillMapIcon,
  FillMessageIcon,
  FillNoticeIcon,
  FillQuestionIcon,
  LogoutIcon,
  MapIcon,
  MessageIcon,
  NoticeIcon,
  ProfileIcon,
  QuestionIcon,
} from '@/components/UI/Icons';
import { usePathname } from 'next/navigation';

export default function SideNavbar() {
  const pathName = usePathname();
  const MENU = [
    {
      name: '장소찾기',
      href: '/content/place',
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
      <div className='mr-8'>
        <header className='w-full'>
          <figure className='ml-4'>
            <Link alt='logo' href='/'>
              <Image src={'/Images/clickpick_logo.png'} alt='#' width={168} height={76} />
            </Link>
          </figure>
        </header>
        <nav className='flex h-[289px] w-[220px] items-center'>
          <ul className='flex w-full flex-col gap-[13px] text-sm [&>*]:h-[50px] [&>*]:pl-4 [&>*]:font-bold'>
            {MENU.map(({ name, href, icon, clickedIcon }) => (
              <Link
                key={href}
                href={href}
                className={`flex rounded-2xl hover:bg-pink-100 ${href === pathName && 'bg-pink-100'} transition-all active:bg-pink-200`}
              >
                <li className='flex items-center gap-2'>
                  {href === pathName ? clickedIcon : icon} {name}
                </li>
              </Link>
            ))}
          </ul>
        </nav>
        <div className='flex w-full justify-center gap-5  [&>div]:rounded-xl [&>div]:text-xs'>
          <div className='flex h-[40px] w-[100px] items-center justify-center gap-1 bg-pink-100 px-3 py-2 font-bold'>
            <ProfileIcon size={24} />내 정보
          </div>
          <div className='flex h-[40px] w-[100px] items-center gap-1 bg-pink-100 px-3 py-2 font-bold'>
            <LogoutIcon size={24} />
            로그아웃
          </div>
        </div>
      </div>
    </>
  );
}