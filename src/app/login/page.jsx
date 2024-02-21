'use client';
import { MdOutlineMailOutline } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  let [id, setId] = useState(''); // setState로 id 초기값 공백
  let [pw, setPw] = useState(''); // setState로 password초기값 공백
  const [button, setButton] = useState(true);
  const router = useRouter();
  const goToMain = () => {
    router.push('/');
    // router.push('/');최상단 root로 가는길
  };
  const defaultInputStyle = 'rounded-lg outline-none h-[45px] pl-7';
  const realId = 'kiki@naver.com';
  const realPw = '12345678';
  function changeButton() {
    id.includes('@') && pw.length >= 5 ? setButton(false) : setButton(true);
  } // changeButton()함수는 id에 @가 포함되어있고 pw의 글자가 5글자 이상일때 조건식이 맞을때 false, 맞지 않을때 true로 견경해줌.
  //API요청하는코드

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
                onKeyUp={changeButton}
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
                onKeyUp={changeButton}
              />
              {/* input에 입력되는 내용이 바뀔때마다 e.target.value의 값이 pw로 담김 */}
            </div>
            <div className='flex justify-center'>
              <button
                type='button'
                disabled={button}
                onClick={(e) => {
                  if (realId == id) {
                    if (realPw == pw) {
                      e.stopPropagation();
                      goToMain();
                    }
                  } else {
                    alert('아이디 혹은 비밀번호가 일치하지 않습니다.');
                  }
                }}
                // button의 값이 true일경우 disabled가 작동 false일 경우 disabled가 작동하지 않도록 disabled={button}을 작성
                // 아직 백앤드와 통신하지 않기 때문에 realId와 realPw라는 변수에 임의로 값을 지정해주고 만약 일치할 경우에만 main페이지로 이동하도록 goToMain함수를 실행
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
            {/* <div>소셜 로그인</div> */}
          </form>
        </section>
      </div>
    </>
  );
}
