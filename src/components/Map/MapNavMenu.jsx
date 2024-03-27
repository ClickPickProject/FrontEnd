'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MapNavMenu() {
  const pathName = usePathname();
  const menu = [
    {
      href: '#',
      icon: '',
      clickedIcon: '',
      content: '홈 화면',
    },
    {
      href: '#',
      icon: '',
      clickedIcon: '',
      content: '탐색하기',
    },
    {
      href: '#',
      icon: '',
      clickedIcon: '',
      content: '즐겨찾기',
    },
    {
      href: '#',
      icon: '',
      clickedIcon: '',
      content: '날씨현황',
    },
  ];

  const defaultClass = 'flex w-full justify-center py-4 text-sm';
  return (
    <nav className='w-[100px] border-2 border-red-300'>
      <div className='flex flex-col items-center font-bold'>
        <figure className='p-4'>
          <Image src='/Images/clickpick_icon.png' width={40} height={40} alt='logo' />
        </figure>
        {menu.map(({ content, href }) => (
          <ul key={content} className='w-full'>
            <Link href={href}>
              <div
                className={`${defaultClass} ${pathName === href ? 'bg-pink-400 text-white' : 'bg-white text-pink-500 transition-all hover:bg-pink-100 hover:text-pink-500'}`}
              >
                <li className='px-2 py-2'>{content}</li>
              </div>
            </Link>
          </ul>
        ))}
      </div>
    </nav>
  );
}
