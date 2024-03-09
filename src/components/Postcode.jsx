'use client';
import { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

export default function Postcode({ scriptUrl }) {
  const [address, setAddress] = useState('');
  const open = useDaumPostcodePopup(scriptUrl);
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    console.log(fullAddress);
    setAddress(fullAddress);
  };
  const handleClick = (e) => {
    open({
      onComplete: handleComplete,
      autoClose: true,
      popupTitle: '클릭픽 장소 검색',
      left: 600,
      top: 300,
      theme: {
        // bgColor: '#fce7f3', //바탕 배경색
        searchBgColor: '#fdf2f8', //검색창 배경색
        contentBgColor: '##fdf2f8', //본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
        //pageBgColor: "", //페이지 배경색
        // textColor: '#fff', //기본 글자색
        // queryTextColor: '#fff', //검색창 글자색
        postcodeTextColor: '#ec4899', //우편번호 글자색
        emphTextColor: '#4f46e5', //강조 글자색
        //outlineColor: "", //테두리
      },
    });

    e.preventDefault();
  };

  return (
    <>
      <div className='flex w-full flex-1 justify-center gap-2 rounded-lg transition-all'>
        <input
          disabled
          className='h-full w-full rounded-lg border pl-2 text-sm outline-none'
          placeholder='장소를 입력하세요'
          value={address}
        />
        <button
          onClick={handleClick}
          className='flex w-16 items-center justify-center rounded-lg bg-pink-300 text-sm shadow-md transition-all hover:bg-pink-400 hover:text-white'
        >
          검색
        </button>
      </div>
    </>
  );
}
