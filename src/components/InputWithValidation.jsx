'use client';
import { useEffect, useState } from 'react';
export default function InputWithation({
  label,
  icon,
  type,
  id,
  value,
  onChange,
  onClickValidCheck,
  valid,
  buttonDisabled,
  inputDisabled,
  errorMsg,
  correctMsg,
  ValidationCheckMsg,
  onVisible,
  duplicateCheck,
}) {
  const defaultInputStyle = 'h-[45px] rounded-lg pl-7 outline-none';
  const correctMsgStyle = 'flex w-[350px] text-sm text-blue-600';
  const errorMsgStyle = 'flex w-[350px] text-sm text-red-600';
  const validCheckVisible =
    label === '비밀번호' || label === '비밀번호 확인' || label === '이름' ? 'invisible' : 'visible';

  const [timer, setTimer] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);

  // 타이머 초기화 함수
  const initializeTimer = () => {
    clearInterval(timer);
    setRemainingTime(0);
  };

  // 컴포넌트가 언마운트되면 타이머 정리
  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, [timer]);

  // 남은 시간을 분:초 형식으로 반환하는 함수
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // 인증번호 확인 버튼 클릭 시 타이머 시작
  const handleVerificationClick = () => {
    onClickValidCheck(); // 중복 확인 함수 호출

    // 타이머 시작
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);
    setRemainingTime(300);
    setTimer(interval);
    console.log(inputDisabled);
  };

  // 타이머가 종료되면 초기화
  useEffect(() => {
    if (remainingTime === 0) {
      initializeTimer();
    }
  }, [remainingTime]);
  return (
    <>
      <div className='relative flex w-[350px] flex-col'>
        {icon}
        <input
          placeholder={label}
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          required
          disabled={inputDisabled}
          className={`${defaultInputStyle}`}
        />

        {duplicateCheck && remainingTime > 0 && (
          <div
            className={`${errorMsgStyle} absolute right-1/3 top-20 z-50 inline-flex h-full w-auto items-center justify-end`}
          >
            {formatTime(remainingTime)}
          </div>
        )}
        <div className={`absolute right-2 flex h-full items-center ${validCheckVisible}`}>
          <button
            disabled={buttonDisabled}
            onClick={(e) => {
              e.preventDefault();
              onClickValidCheck();
              if (label === '이메일') {
                handleVerificationClick();
              }
            }}
            className={`${valid ? 'bg-pink-300 hover:bg-pink-500 hover:text-white' : 'bg-gray-200'} rounded-md px-3 py-1 text-sm transition-all`}
          >
            {label === '인증번호' ? '인증번호 확인' : '중복확인'}
          </button>
        </div>
      </div>
      {valid ? (
        <div className={`${onVisible} ${correctMsgStyle}`}>{duplicateCheck ? ValidationCheckMsg : correctMsg}</div>
      ) : (
        <div className={`${onVisible} ${errorMsgStyle}`}>{errorMsg}</div>
      )}
    </>
  );
}
