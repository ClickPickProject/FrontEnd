import Image from 'next/image';
import Link from 'next/link';

export default function HomeNavbar() {
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
              <li className='border-b-2 border-pink-400 pb-1 text-pink-400'>장소찾기</li>
              <li>커뮤니티</li>
            </div>
            <Link href='/login' className='mr-[50px]'>
              로그인
            </Link>
          </ul>
        </nav>
      </header>
    </>
  );
}
