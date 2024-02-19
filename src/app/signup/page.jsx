'use client';
import { MdOutlineMailOutline } from 'react-icons/md';
import { SiNamecheap } from 'react-icons/si';
import { RiLockPasswordLine } from 'react-icons/ri';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
export default function SignUpPage() {
  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [confirmPwValid, setConfirmPwValid] = useState(false);
  const [userData, setUserData] = useState({
    id: '',
    pw: '',
    confirmPw: '',
    nickname: '',
  });
  const { id, pw, confirmPw, nickname } = userData;
  const onChangeId = (e) => {
    setUserData({ ...userData, id: e.target.value });
    const reg = /^.{4,12}$/;
    reg.test(e.target.value) ? setIdValid(true) : setIdValid(false);
  };
  const onChangePw = (e) => {
    const reg = /^.{6,}$/;
    setUserData({ ...userData, pw: e.target.value });
    reg.test(e.target.value) ? setPwValid(true) : setPwValid(false);
  };
  const onChangeConfirmPw = (e) => {
    setUserData({ ...userData, confirmPw: e.target.value });
  };

  const isSame = pw === confirmPw;

  const onChangeNick = (e) => {};

  const handleRegister = async (e) => {};
  const onVisible = {
    id: id.length === 0 ? 'invisible' : 'visible',
    pw: pw.length === 0 ? 'invisible' : 'visible',
  };

  const defaultInputStyle = 'rounded-lg outline-none h-[45px] pl-7';

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
              <MdOutlineMailOutline
                size={20}
                className='absolute ml-1 flex h-full items-center justify-center  opacity-50'
              />
              <input
                placeholder='아이디'
                type='text'
                id='id'
                onChange={onChangeId}
                required
                className={`${defaultInputStyle}`}
              />
              <div className='absolute right-3 flex h-full items-center'>
                <button className='rounded-md bg-pink-300 px-3 py-1 text-sm transition-all hover:bg-pink-500 hover:text-white'>
                  중복 확인
                </button>
              </div>
            </div>

            {idValid ? (
              <div className={`flex w-[350px] font-semibold text-blue-600`}>사용할 수 있는 아이디입니다.</div>
            ) : (
              <div className={`${onVisible.id} flex w-[350px] font-semibold text-red-600`}>
                아이디는 4~12자 이내로 입력해주세요
              </div>
            )}
            <div className='relative flex w-[350px] flex-col'>
              <RiLockPasswordLine
                size={20}
                className='absolute ml-1 flex h-full items-center justify-center opacity-50'
              />
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
              <div className='flex w-[350px] font-semibold text-red-600'>
                영문과 숫자를 포함하여 6자 이상 입력해주세요
              </div>
            )}

            <div className='relative flex w-[350px] flex-col'>
              <RiLockPasswordLine
                size={20}
                className='absolute ml-1 flex h-full items-center justify-center opacity-50'
              />
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
              <div className='flex w-[350px] font-semibold text-blue-600'>비밀번호가 서로 일치합니다.</div>
            ) : (
              <div className='flex w-[350px] font-semibold text-red-600'>비밀번호가 서로 일치하지 않습니다.</div>
            )}

            <div className='relative flex w-[350px] flex-col'>
              <SiNamecheap size={20} className='absolute ml-1 flex h-full items-center justify-center opacity-50' />
              <input placeholder='닉네임' type='text' id='nickname' required className={`${defaultInputStyle}`} />
              <div className='absolute right-3 flex h-full items-center'>
                <button className='rounded-md bg-pink-300 px-3 py-1 text-sm transition-all hover:bg-pink-500 hover:text-white'>
                  중복 확인
                </button>
              </div>
            </div>
            {/* <div className='flex w-[350px] font-semibold text-red-600'>이미 사용중인 닉네임입니다.</div> */}
            <div className='flex w-[350px] font-semibold text-blue-500'>사용 가능한 닉네임입니다.</div>
            <div className='flex justify-center'>
              <button
                type='submit'
                className='flex h-[45px] w-[350px]  items-center justify-center rounded-lg bg-pink-400 text-xl font-semibold text-white opacity-50 transition-all hover:bg-pink-500 hover:text-white hover:opacity-100'
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
