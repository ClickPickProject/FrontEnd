'use client';
import { MyNicknameState, tokenState } from '@/atoms/tokenState';
import Image from 'next/image';
import Link from 'next/link';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { pageNavModal } from '@/atoms/pageState';
import { userImgState } from '@/atoms/userInfoState';
import { axiosInstance } from '../utils/Axios';
import { loginState } from '@/atoms/tokenState';
export default function HomeNavbar() {
  const token = useRecoilValue(tokenState);
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const MyNickname = useRecoilValue(MyNicknameState);
  const [NavModal, setNavModal] = useRecoilState(pageNavModal);
  const [image, setImage] = useRecoilState(userImgState);
  const router = useRouter();
  useEffect(() => {
    localStorage.getItem('token') ? setIsLogin(true) : setIsLogin(false);
  }, [token]);

  const hoverStyle =
    'hover:border-b-2 hover:border-pink-400 hover:text-pink-400 border-b-2 border-transparent pb-1 sm:pb-0 transition-all';
  // 유저 이미지 받아오기
  const { data, isPending, isError } = useQuery({
    queryKey: ['profileImg'],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get('/api/profile/image', {
          headers: {
            Authorization: token,
          },
        });
        if (res.status === 200) {
          setImage(res.data.url);
        }
        return res.data;
      } catch (error) {}
    },
  });

  const homeNavClick = () => {
    setNavModal((value) => !value);
    router.replace('/');
  };
  return (
    <>
      <header className='h-[78px] bg-white'>
        <nav className='flex h-full w-full items-center'>
          <figure className='absolute ml-4 sm:w-[100px]'>
            <Link alt='logo' href='/'>
              <Image src={'/Images/clickpick_logo.png'} alt='#' width={168} height={76} />
            </Link>
          </figure>
          <ul className='relative flex w-full items-center justify-center gap-4 text-[20px] font-bold sm:text-xs'>
            <Link href='/place'>
              <li className={`${hoverStyle} `}>장소찾기</li>
            </Link>
            <Link href='/content/community'>
              <li className={hoverStyle}>커뮤니티</li>
            </Link>
            <div className='absolute right-0 flex pr-8'>
              {isLogin ? (
                <>
                  <div className='flex gap-4'>
                    {MyNickname === 'ADMIN' && (
                      <button onClick={() => router.push('/manager')} className={`${hoverStyle}`}>
                        대시보드
                      </button>
                    )}
                    <img
                      src={image}
                      onClick={homeNavClick}
                      alt='#'
                      className='mx-auto mb-2 h-[50px] w-[50px] rounded-full border-4 border-white shadow-xl '
                    />
                  </div>
                </>
              ) : (
                <Link href='/login' className={`${hoverStyle}`}>
                  로그인
                </Link>
              )}
            </div>
          </ul>
        </nav>
      </header>
    </>
  );
}
