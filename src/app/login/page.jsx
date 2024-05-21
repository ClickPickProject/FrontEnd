'use client';
import { MailIcon, PasswordIcon } from '@/components/UI/Icons';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { MyNicknameState, tokenState } from '@/atoms/tokenState';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import { axiosInstance, setHeader } from '@/components/utils/Axios';
import axios from 'axios';

export default function LoginPage() {
  let [id, setId] = useState('');
  let [pw, setPw] = useState('');
  const setToken = useSetRecoilState(tokenState);
  const [MyNickname, setMyNickname] = useRecoilState(MyNicknameState);
  const router = useRouter();
  const defaultInputStyle = 'rounded-lg outline-none h-[45px] pl-7';

  const [cookies, setCookie] = useCookies();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const body = {
        id,
        password: pw,
      };
      const res = await axiosInstance.post(`/api/login`, body, {});
      const accessToken = res.headers['authorization'];
      setHeader('authorization', accessToken);

      if (res.status === 200) {
        setToken(accessToken);
        setMyNickname(res.data.nickname);
        console.log(res);
        console.log(document.cookie);
        console.log(res.headers);
        toast.success(`${res.data.nickname}님 환영합니다!`, {
          position: 'top-right',
        });
        router.replace('/');
      }
    } catch (err) {
      toast.error('로그인 할 수 없습니다.', {
        position: 'top-right',
      });
    }
  };
  return (
    <>
      <div className='h-[100dvh] bg-[#fdf4f5]'>
        <section className='absolute left-1/2 top-1/2 flex h-[550px] w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col  rounded-2xl  bg-pink-200  shadow-[1px_1px_200px_1px] shadow-pink-200 sm:h-[350px] sm:w-auto'>
          <figure className='mx-auto p-6'>
            <Link href='/'>
              <Image src='/Images/clickpick_icon.png' alt='login' width={52} height={52} />
            </Link>
          </figure>
          <h2 className='mx-auto mb-8 text-2xl font-bold'>클릭픽 로그인</h2>
          <form onSubmit={handleRegister} className='flex w-full flex-col items-center justify-center gap-8'>
            <div className='relative flex w-[350px] flex-col sm:w-[250px]'>
              <MailIcon size={20} className='absolute ml-1 flex h-full items-center justify-center opacity-50' />
              <input
                placeholder='아이디'
                type='text'
                id='id'
                required
                className={`${defaultInputStyle}`}
                onChange={(e) => {
                  setId(e.target.value);
                }}
              />
            </div>
            <div className='relative flex w-[350px] flex-col sm:w-[250px]'>
              <PasswordIcon size={20} className='absolute ml-1 flex h-full items-center justify-center opacity-50' />
              <input
                placeholder='비밀번호'
                type='password'
                id='password'
                required
                className={`${defaultInputStyle}`}
                onChange={(e) => {
                  setPw(e.target.value);
                }}
              />
            </div>

            <div className='flex justify-center'>
              <button
                type='submit'
                className='flex h-[50px] w-[350px] items-center
               justify-center rounded-lg bg-pink-400 text-2xl font-semibold  text-white transition-all
                hover:bg-pink-500 hover:text-white'
              >
                로그인
              </button>
            </div>
            <div className='flex text-gray-600 '>
              회원이 아니신가요?
              <div className='pl-2 font-semibold text-black'>
                <Link href='/signup' className=''>
                  회원가입
                </Link>
              </div>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
