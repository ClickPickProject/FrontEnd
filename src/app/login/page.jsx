'use client';
import Image from 'next/image';
import Link from 'next/link';
import { MailIcon, PasswordIcon } from '@/components/UI/Icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
export default function LoginPage() {
  let [id, setId] = useState(''); // setState로 id 초기값 공백
  let [pw, setPw] = useState(''); // setState로 password초기값 공백
  const [button, setButton] = useState(true);
  function changeButton() {
    id.includes('@') && pw.length >= 5 ? setButton(false) : setButton(true);
  }
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`http://localhost:3001/api/login`, { id, pw }, { withCredentials: true });
      if (res.status === 200) {
        alert('로그인이 완료되었습니다.');
        router.push('/');
      }
    } catch (err) {
      console.log(err);
      alert('로그인 불가');
    }
  };

  const defaultInputStyle = 'rounded-lg outline-none h-[45px] pl-7';
  return (
    <>
      <div className='h-[100dvh] bg-[#fdf4f5]'>
        <section className='absolute left-1/2 top-1/2 flex h-[550px] w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col  rounded-2xl  bg-pink-200  shadow-[1px_1px_200px_1px] shadow-pink-200'>
          <figure className='mx-auto p-6'>
            <Image src='/Images/clickpick_icon.png' alt='' width={52} height={52} />
          </figure>
          <h2 className='mx-auto mb-8 text-2xl font-bold'>클릭픽 로그인</h2>
          <form className='flex w-full flex-col items-center justify-center gap-8'>
            <div className='relative flex w-[350px] flex-col'>
              <MailIcon size={20} />
              <input
                placeholder='아이디'
                type='text'
                id='id'
                required
                className={`${defaultInputStyle}`}
                onChange={(e) => {
                  setId(e.target.value);
                }}
                onKeyUp={changeButton}
              />
            </div>
            <div className='relative flex w-[350px] flex-col'>
              <PasswordIcon size={20} />
              <input
                placeholder='비밀번호'
                type='password'
                id='password'
                required
                className={`${defaultInputStyle}`}
                onChange={(e) => {
                  setPw(e.target.value);
                }}
                onKeyUp={changeButton}
              />
            </div>
            <div className='flex justify-center'>
              <button className='flex h-[50px] w-[350px]  items-center justify-center rounded-lg bg-pink-400 text-2xl font-semibold text-white transition-all hover:bg-pink-500 hover:text-white'>
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
            {/* <div>소셜 로그인</div> */}
          </form>
        </section>
      </div>
    </>
  );
}
