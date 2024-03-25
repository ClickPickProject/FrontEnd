'use client';
import { tokenState } from '@/atoms/tokenState';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function HomeNavbar() {
  const token = useRecoilValue(tokenState);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    localStorage.getItem('token') ? setIsLogin(true) : setIsLogin(false);
  }, [token]);

  const hoverStyle =
    'hover:border-b-2 hover:border-pink-400 hover:text-pink-400 border-b-2 border-transparent t pb-1 transition-all';
  const onClickLogout = () => {
    localStorage.clear();
    setIsLogin(false);
  };
  return (
    <>
      <header className='h-[78px] bg-white'>
        <nav className='flex h-full w-full items-center'>
          <figure className='absolute ml-4'>
            <Link alt='logo' href='/'>
              <Image src={'/Images/clickpick_logo.png'} alt='#' width={168} height={76} />
            </Link>
          </figure>
          <ul className='relative flex w-full justify-center gap-4 text-[20px] font-bold'>
            <div className='flex flex-1 items-center justify-center gap-4'>
              <Link href='/content/place'>
                <li className={`${hoverStyle} `}>장소찾기</li>
              </Link>
              <Link href='/content/community'>
                <li className={hoverStyle}>커뮤니티</li>
              </Link>
              <div className='absolute right-0 flex pr-8'>
                {isLogin ? (
                  <>
                    <div className='flex gap-4'>
                      <button onClick={onClickLogout} className={`${hoverStyle}`}>
                        로그아웃
                      </button>
                      <Link href='/profile' className={`${hoverStyle}`}>
                        내 정보
                      </Link>
                    </div>
                  </>
                ) : (
                  <Link href='/login' className={`${hoverStyle}`}>
                    로그인
                  </Link>
                )}
              </div>
            </div>
          </ul>
        </nav>
      </header>
    </>
  );
}
