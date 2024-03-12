'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomeNavbar() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    }
  }, []);
  const hoverStyle =
    'hover:border-b-2 hover:border-pink-400 hover:text-pink-400 border-b-2 border-transparent t pb-1 transition-all';
  const onClickLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };
  return (
    <>
      <header className='h-[78px] bg-white'>
        <nav className='flex h-full items-center'>
          <figure className='ml-4'>
            <Link alt='logo' href='/'>
              <Image src={'/Images/clickpick_logo.png'} alt='#' width={168} height={76} />
            </Link>
          </figure>
          <ul className='flex w-full justify-between gap-4 text-[20px] font-bold'>
            <div className='mx-auto flex gap-4'>
              <Link href='/content/place'>
                <li className={`${hoverStyle} `}>장소찾기</li>
              </Link>
              <Link href='/content/community'>
                <li className={hoverStyle}>커뮤니티</li>
              </Link>
            </div>
            {token ? (
              <button onClick={onClickLogout} className={`mr-[50px] ${hoverStyle} `}>
                로그아웃
              </button>
            ) : (
              <Link href='/login' className={`mr-[50px] ${hoverStyle} `}>
                로그인
              </Link>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}
