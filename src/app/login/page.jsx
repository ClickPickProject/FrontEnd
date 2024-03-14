'use client';
import { MdOutlineMailOutline } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { tokenState } from '@/atoms/tokenState';

export default function LoginPage() {
  let [id, setId] = useState(''); // setState로 id 초기값 공백
  let [pw, setPw] = useState(''); // setState로 password초기값 공백
  const [token, setToken] = useRecoilState(tokenState);
  const router = useRouter();
  const goToMain = () => {
    router.push('/');
  };
  const defaultInputStyle = 'rounded-lg outline-none h-[45px] pl-7';

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `/api/login`,
        { id: id, password: pw },
        {
          withCredentials: true,
        },
      );

      const token = res.headers['authorization'];
      console.log(token);

      if (res.status === 200) {
        localStorage.clear();
        setToken(token);
        router.push('/');
      }
    } catch (err) {
      console.log(err);
      alert('로그인 불가');
    }
  };

  return (
    <>
      <div className='h-[100dvh] bg-[#fdf4f5]'>
        <section className='absolute left-1/2 top-1/2 flex h-[550px] w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col  rounded-2xl  bg-pink-200  shadow-[1px_1px_200px_1px] shadow-pink-200'>
          <figure className='mx-auto p-6'>
            <Image src='/Images/clickpick_icon.png' alt='' width={52} height={52} />
          </figure>
          <h2 className='mx-auto mb-8 text-2xl font-bold'>클릭픽 로그인</h2>
          <form onSubmit={handleRegister} className='flex w-full flex-col items-center justify-center gap-8'>
            <div className='relative flex w-[350px] flex-col'>
              <MdOutlineMailOutline
                size={20}
                className='absolute ml-1 flex h-full items-center justify-center opacity-50'
              />
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
              {/* //input에 입력되는 내용이 바뀔때마다 e.target.value의 값이 id로 담김 */}
            </div>
            <div className='relative flex w-[350px] flex-col'>
              <RiLockPasswordLine
                size={20}
                className='absolute ml-1 flex h-full items-center justify-center opacity-50'
              />
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
                hover:bg-pink-500 hover:text-white
                '
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
