'use client';
import { MdOutlineMailOutline } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginPage() {
  const router = useRouter();

  //로그인 값
  const [inputValue, setInputValue] = useState({
    id: '',
    password: '',
  });

  //로그인 체크
  const [check, setCheck] = useState({
    user: true,
    login: true,
  });

  //button에서 change된 값 저장.
  const inputChangeHandler = (e, name) => {
    const { value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const doLogin = async () => {
    try {
      const { data } = await axios.post('http://localhost:3001/login', inputValue);
      console.log('로그인 되었습니다.');
      const user = data;
    } catch (error) {
      console.log(error);
    }
  };

  // const doLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post('http://localhost:3001/login', inputValue, { withCrendentials: true });
  //     console.log(res);
  //     var keys = Object.keys(json); //키를 가져옵니다. 이때, keys 는 반복가능한 객체가 됩니다.
  //     for (var i = 0; i < keys.length; i++) {
  //       var key = keys[i];
  //       console.log('key : ' + key + ', value : ' + json[key]);
  //     }
  //     if (res.data.isEmailEqual) {
  //       if (res.data.isPasswordEqual) {
  //         try {
  //           //서버로 토큰을 받은 후 받은 토큰으로 LoginSuccess실행
  //           const tokenResponse = await apiInstance.post('/auth', { email: values.email });
  //         } catch (e) {
  //           console.log(e);
  //         }
  //       } else
  //         setCheck({
  //           ...check,
  //           login: false,
  //           user: true,
  //         }); // 로그인 실패, 이메일이나 비밀번호 확인
  //     } else {
  //       console.log('이메일이 존재하지 않습니다!');
  //       setCheck({
  //         ...check,
  //         login: false,
  //         user: false,
  //       }); // 존재하지 않는 이메일
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // //로그인 토큰 받아 실행하기.
  // const doLogin = async (e) => {
  //   try {
  //     const res = await axios.post('/api/login', inputValue, { withCrendentials: true })
  //     then(res) => {
  //       alert("성공");

  //     }
  //     console.log(res);

  //     console.log(res.status);
  //     console.log(res.data.message);

  //     // console.log(res.data.message);
  //     // console.log(res.data);
  //     // dispatchEvent(setUser(user));

  //     //유저
  //     // const user = inputValue.find((u) => u.id === id && u.password === password);

  //     // if (!user) {
  //     //   console.log('Who?');
  //     //   return;
  //     // }
  //     if (res.status === 200) {
  //       console.log('1로그인 성공');
  //       router.push('/');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     console.log('3잘못된 아이디 또는 비밀번호');
  //   }
  // };

  const defaultInputStyle = 'rounded-lg outline-none h-[45px] pl-7';

  return (
    <>
      <div className='h-[100dvh] bg-[#fdf4f5]'>
        <section className='absolute left-1/2 top-1/2 flex h-[550px] w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col  rounded-2xl  bg-pink-200  shadow-[1px_1px_200px_1px] shadow-pink-200'>
          <figure className='mx-auto p-6'>
            <Image src='/Images/clickpick_icon.png' alt='' width={52} height={52} />
          </figure>
          <h2 className='mx-auto mb-8 text-2xl font-bold'>클릭픽 로그인</h2>
          <form onSubmit={doLogin} className='flex w-full flex-col items-center justify-center gap-8'>
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
                // onChange={(e) => {
                //   inputChangeHandler;
                // }}
                onChange={(e) => inputChangeHandler(e, 'id')}
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
                onChange={(e) => inputChangeHandler(e, 'password')}
              />
              {/* input에 입력되는 내용이 바뀔때마다 e.target.value의 값이 pw로 담김 */}
            </div>

            <div className='flex justify-center'>
              <button
                type='button'
                onClick={doLogin}
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
