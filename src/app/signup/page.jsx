'use client';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MailIcon, NickIcon, PasswordIcon } from '@/components/UI/Icons';
export default function SignUpPage() {
  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [nickValid, setNickValid] = useState(false);
  const [userData, setUserData] = useState({
    user_id: '',
    pw: '',
    confirmPw: '',
    nickname: '',
  });
  const [idValidCheck, setIdValidCheck] = useState(false);
  const [pwValidCheck, setPwValidCheck] = useState(false);

  const { user_id, pw, confirmPw, nickname } = userData;
  const router = useRouter();
  const idRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const pwRegex = /^.{6,}$/;
  const nickRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;

  const onChangeId = (e) => {
    setUserData({ ...userData, user_id: e.target.value });
    idRegex.test(e.target.value) ? setIdValid(true) : setIdValid(false);
  };
  const onChangePw = (e) => {
    setUserData({ ...userData, pw: e.target.value });
    pwRegex.test(e.target.value) ? setPwValid(true) : setPwValid(false);
  };
  const onChangeConfirmPw = (e) => {
    setUserData({ ...userData, confirmPw: e.target.value });
  };

  const onChangeNick = (e) => {
    setUserData({ ...userData, nickname: e.target.value });
    nickRegex.test(e.target.value) ? setNickValid(true) : setNickValid(false);
  };

  const isSame = pw === confirmPw;
  const isAllValid = idValid && pwValid && confirmPw && nickValid && isSame;

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:3000/api/signup',
        { user_id: user_id, pw: pw, nickname: nickname },
        {
          headers: {
            'Content-type': 'application/json',
          },
        },
      );
      if (res.status === 200) {
        console.log(res);
        router.push('/');
      }
    } catch (err) {
      console.log(err);
      alert('회원가입 불가');
    }
  };
  const onVisible = {
    user_id: user_id.length === 0 ? 'invisible' : 'visible',
    pw: pw.length === 0 ? 'invisible' : 'visible',
    confirmPw: confirmPw.length === 0 ? 'invisible' : 'visible',
    nickname: nickname.length === 0 ? 'invisible' : 'visible',
  };

  const defaultInputStyle = 'rounded-lg outline-none h-[45px] pl-7';
  const errorMsgStyle = 'flex w-[350px] font-semibold text-red-600';

  return (
    <>
      <div className='h-[100dvh] bg-[#fdf4f5]'>
        <section className='absolute left-1/2 top-1/2 flex h-[700px] w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl bg-pink-200  shadow-[1px_1px_200px_1px]  shadow-pink-200'>
          <figure className='mx-auto p-6'>
            <Image src='/Images/clickpick_icon.png' alt='' width={52} height={52} />
          </figure>
          <h2 className='mx-auto mb-8 text-2xl font-bold'>클릭픽 회원가입</h2>
          <form onSubmit={handleRegister} className='j flex w-full flex-col items-center justify-center gap-4'>
            <div className='relative flex w-[350px] flex-col'>
              <MailIcon size={20} />
              <input
                placeholder='이메일'
                type='email'
                id='user-id'
                onChange={onChangeId}
                required
                className={`${defaultInputStyle}`}
              />
              <div className='absolute right-3 flex h-full items-center'>
                <button
                  disabled
                  className='rounded-md bg-pink-300 px-3 py-1 text-sm transition-all hover:bg-pink-500 hover:text-white'
                >
                  중복 확인
                </button>
              </div>
            </div>

            {idValid ? (
              <div className={`flex w-[350px] font-semibold text-blue-600`}>사용할 수 있는 이메일입니다.</div>
            ) : (
              <div className={`${onVisible.user_id} ${errorMsgStyle}`}>이메일 주소가 올바르지 않습니다.</div>
            )}
            <div className='relative flex w-[350px] flex-col'>
              <PasswordIcon size={20} />
              <input
                placeholder='비밀번호'
                type='password'
                id='pw'
                onChange={onChangePw}
                required
                className={`${defaultInputStyle}`}
                value={pw}
              />
            </div>
            {pwValid ? (
              <div className='flex w-[350px] font-semibold text-blue-600'>사용할 수 있는 비밀번호입니다.</div>
            ) : (
              <div className={`${onVisible.pw} ${errorMsgStyle}`}>영문과 숫자를 포함하여 6자 이상 입력해주세요</div>
            )}

            <div className='relative flex w-[350px] flex-col'>
              <PasswordIcon size={20} />
              <input
                placeholder='비밀번호 확인'
                type='password'
                id='confirmPw'
                onChange={onChangeConfirmPw}
                required
                className={`${defaultInputStyle}`}
              />
            </div>
            {isSame ? (
              <div className={`${onVisible.confirmPw} w-[350px] font-semibold text-blue-600`}>
                비밀번호가 서로 일치합니다.
              </div>
            ) : (
              <div className={`${onVisible.confirmPw} ${errorMsgStyle}`}>비밀번호가 서로 일치하지 않습니다.</div>
            )}

            <div className='relative flex w-[350px] flex-col'>
              <NickIcon size={20} />
              <input
                placeholder='닉네임'
                type='text'
                id='nickname'
                onChange={onChangeNick}
                required
                className={`${defaultInputStyle}`}
              />
              <div className='absolute right-3 flex h-full items-center'>
                <button
                  disabled
                  className='rounded-md bg-pink-300 px-3 py-1 text-sm transition-all hover:bg-pink-500 hover:text-white'
                >
                  중복 확인
                </button>
              </div>
            </div>
            {nickValid ? (
              <div className='flex w-[350px] font-semibold text-blue-500'>올바른 닉네임입니다.</div>
            ) : (
              <div className={`${onVisible.nickname} ${errorMsgStyle}`}>
                2~16자 사이의 영어, 숫자, 한글로 입력해주세요
              </div>
            )}
            <div className='flex justify-center'>
              <button
                type='submit'
                className={`flex h-[45px] w-[350px]  items-center justify-center rounded-lg bg-pink-400 text-xl font-semibold text-white transition-all hover:text-white ${isAllValid ? 'opacity-100' : 'opacity-50'}`}
                disabled={!isAllValid}
              >
                가입하기
              </button>
            </div>
            <div className='flex text-gray-600 '>
              이미 회원이신가요?
              <button className='pl-2 font-semibold text-black'>
                <Link href='/login'>로그인</Link>
              </button>
            </div>
            {/* <div>소셜 회원가입</div> */}
          </form>
        </section>
      </div>
    </>
  );
}
