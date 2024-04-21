import Image from 'next/image';
import Link from 'next/link';

export default function Footer({ dark }) {
  const hoverStyle =
    'hover:border-b-2 hover:border-pink-400 hover:text-pink-400 border-b-2 border-transparent pb-1 sm:pb-0 transition-all';
  return (
    <footer
      className={`flex h-72 w-full flex-col items-center justify-center gap-4 bg-pink-100 ${dark && 'border border-gray-800 bg-[#06141d] text-gray-300'}`}
    >
      <Link href='/'>
        <Image src={'/Images/clickpick_icon.png'} alt='clickpick' width={50} height={50} />
      </Link>
      <div className='text-lg font-bold text-pink-800'>ClickPick</div>
      <ul className='flex gap-4'>
        <Link href='/place'>
          <li className={`${hoverStyle} `}>장소찾기</li>
        </Link>
        <Link href='/content/community'>
          <li className={hoverStyle}>커뮤니티</li>
        </Link>
      </ul>

      <div className='text-sm text-pink-700'>&copy; 2024 ClickPick. All rights reserved.</div>
    </footer>
  );
}
