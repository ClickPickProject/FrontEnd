'use client';
import { PhoneIcon, UserNameIcon } from '@/components/UI/Icons';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function ForgetIdPage() {
  const defaultInputStyle = 'rounded-lg outline-none h-[45px] pl-7';
  const [viewName, setViewName] = useState('');
  const [foundId, setFoundId] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [findIdInfo, setFindIdInfo] = useState({
    name: '',
    phone: '',
  });

  const validationRegex = {
    name: /^[가-힣]{2,5}$/,
    phone: /^010(\d{3,4})(\d{4})$/,
  };

  const validationRegexCheck =
    !validationRegex.name.test(findIdInfo.name) || !validationRegex.phone.test(findIdInfo.phone);

  const onChangefindIdInfo = (e, field) => {
    const { value } = e.target;
    setFindIdInfo({ ...findIdInfo, [field]: value });
  };

  const handleIdFindSubmit = async (e) => {
    e.preventDefault();
    const { name, phone } = findIdInfo;
    if (validationRegexCheck) {
      setIsValid(false);
      return;
    }
    try {
      const res = await axios.post('http://localhost:3001/member', { name, phone });
      setFindIdInfo({ name: '', phone: '' });
      setViewName(name);
      setFoundId(res.data.id);
      setIsValid(true);
      if (res.status === 200) {
        setViewName(findIdInfo.name);
        setFoundId(res.data.id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className='h-[100dvh] bg-[#fdf4f5]'>
        <section className='absolute left-1/2 top-1/2 flex h-[550px] w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col  rounded-2xl  bg-pink-200  shadow-[1px_1px_200px_1px] shadow-pink-200'>
          <figure className='mx-auto p-6'>
            <Link href='/'>
              <Image src='/Images/clickpick_icon.png' alt='' width={52} height={52} />
            </Link>
          </figure>
          <h2 className='mx-auto mb-8 flex flex-col items-center justify-center text-xl font-bold'>
            클릭픽 아이디 찾기
            <p className='text-sm font-normal'>가입하신 이름과 번호를 입력해주세요</p>
          </h2>
          <form onSubmit={handleIdFindSubmit} className='flex w-full flex-col items-center justify-center gap-8'>
            <div className='relative flex w-[350px] flex-col'>
              <UserNameIcon size={20} />
              <input
                placeholder='이름'
                type='text'
                id='id'
                value={findIdInfo.name}
                onChange={(e) => onChangefindIdInfo(e, 'name')}
                required
                className={`${defaultInputStyle}`}
              />
            </div>
            <div className='relative flex w-[350px] flex-col'>
              <PhoneIcon size={24} />
              <input
                placeholder='휴대폰 번호'
                type='text'
                id='phone'
                value={findIdInfo.phone}
                onChange={(e) => onChangefindIdInfo(e, 'phone')}
                required
                className={`${defaultInputStyle}`}
              />
            </div>
            <div className='flex justify-center'>
              <button
                type='submit'
                disabled={validationRegexCheck}
                className={`${validationRegexCheck ? 'opacity-50' : 'opacity-100 hover:bg-pink-500 hover:text-white'} h-[45px] w-[350px] items-center justify-center rounded-lg bg-pink-400 text-xl font-semibold text-white transition-all`}
              >
                확인
              </button>
            </div>
            <div className='flex text-gray-600 '>
              비밀번호를 잊으셨나요?
              <div className='pl-2 font-semibold text-black'>
                <Link href='/find/forget-pw' className=''>
                  비밀번호 찾기
                </Link>
              </div>
            </div>
            <div className='flex text-gray-600 '>
              <div className={`pl-2 font-semibold text-black`}>
                {isValid ? (
                  <p>
                    <span className='text-pink-500'>{viewName}</span>님의 아이디는
                    <span className='text-pink-500'> {foundId} </span>입니다.
                  </p>
                ) : (
                  <p className={`text-sm text-red-500 ${isValid ? 'visible' : 'invisible'}`}>
                    이름 또는 번호를 찾을 수 없습니다.
                  </p>
                )}
              </div>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
