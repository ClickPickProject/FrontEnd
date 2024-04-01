'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FillHomeIcon } from '../UI/Icons';
import { FaStar } from 'react-icons/fa6';

export default function MapNavMenu() {
  const pathName = usePathname();
  const menu = [
    {
      href: '/place',
      icon: <FillHomeIcon size={20} />,
      clickedIcon: '',
      content: '지도 홈',
    },
    {
      href: '/place/favorite',
      icon: <FaStar size={20} />,
      clickedIcon: '',
      content: '즐겨찾기',
    },
  ];

  const defaultClass = 'flex w-full justify-center py-4 text-sm rounded-xl font-semibold transition-all';
  return (
    <nav className='flex min-h-screen min-w-[80px] flex-col bg-white  shadow-md'>
      <figure className='flex justify-center p-4'>
        <Image src='/Images/clickpick_icon.png' width={40} height={40} alt='logo' />
      </figure>
      {menu.map(({ content, href, icon }) => (
        <ul key={content} className='p-2'>
          <Link href={href}>
            <div
              className={`${defaultClass} ${pathName === href ? 'bg-pink-200 text-pink-600' : 'bg-white text-pink-500  hover:bg-pink-200 hover:text-pink-500'}`}
            >
              <li className='flex flex-col items-center gap-1 text-xs'>
                {icon} {content}
              </li>
            </div>
          </Link>
        </ul>
      ))}
    </nav>
  );
}
