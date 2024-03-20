'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { tokenState } from '@/atoms/tokenState';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userNameState, userPhoneState, userNickNameState } from '@/atoms/userInfoState';
export default function MyProfile() {
  const [name, setName] = useRecoilState(userNameState);
  const [nickName, setNickName] = useRecoilState(userNickNameState);
  const [address, setAddress] = useState('미국');
  const [bio, setBio] = useState('홍박사님을아세요?');
  const [phone, setPhone] = useRecoilState(userPhoneState);
  const token = useRecoilValue(tokenState);
  // useEffect(() => {
  const onClick = async (e) => {
    e.preventDefault();
    try {
      const body = {
        name: name,
        nickname: nickName,
        phone: phone,
      };
      const res = await axios.get('/api/member/userinfo', body, {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200) {
        console.log(res);
        alert('ㅎㅇㅎㅇ');
      }
    } catch (e) {
      console.log(e);
      alert('Error데이터를 불러올 수 없습니다');
    }
  };

  const inputFont = 'mx-2 w-[250px] bg-pink-100 text-gray-500';
  //API로 받아올 값
  const handleNameValueChange = (e) => {
    e.preventDefault();
    console.log('이름이 변경됨');
    //이름변경 저장소
  };
  const handleAddressValueChange = (e) => {
    e.preventDefault();
    console.log('주소가 변경됨');
    //주소변경 저장소
  };
  const handleBioValueChange = (e) => {
    e.preventDefault();
    console.log('소개가 변경됨');
    //주소변경 저장소
  };
  const handleNickNameValueChange = (e) => {
    e.preventDefault();
    console.log('별명이 변경됨');
    //주소변경 저장소
  };
  const handlePhoneValueChange = (e) => {
    e.preventDefault();
    console.log('별명이 변경됨');
    //주소변경 저장소
  };
  const handleSecession = (e) => {
    e.preventDefault();
    alert('정말로 탈퇴하시겠습니까?');
  };
  const handleInputImg = (e) => {
    e.preventDefault();
  };
  const handleSave = (e) => {
    // e.preventDefault();
    // setName();
    // setAddress();
    // setBio();
    // setNickName();
    // setPhone();
    alert('저장되었습니다.');
  };

  return (
    <>
      <div className='flex w-full flex-col'>
        <h1 className='mb-5 text-2xl font-bold '>🙋‍♂️마이 프로필</h1>
        <div className='mb-10 border border-pink-200'></div>

        <div className='mx-auto flex h-96 w-2/3 rounded-2xl border border-pink-200'>
          <div className='mx-auto'>
            <form action='' className='margin ml-8 mt-5'>
              <img src='/sakura.jpg' alt='#' className='h-[150px] w-[150px] rounded-full' />
              <button
                onClick={handleInputImg}
                className='mt-2 w-[150px] rounded-lg border  border-black bg-pink-100 font-semibold'
              >
                📝이미지 추가
              </button>
            </form>
            <div className='mx-auto flex flex-col text-center'>
              <div className='my-5'></div>

              <p>💬게시수 {`()`}</p>
              <p>💬댓글수 {`()`}</p>
              <p>💬조회수 {`()`}</p>
              <button
                onClick={handleSecession}
                className='my-5 ml-8  w-[150px] rounded-lg border border-black bg-pink-100 font-semibold'
              >
                회원탈퇴
              </button>
            </div>
          </div>

          <div className='mx-auto'>
            {/* 이름 */}
            <form onSubmit={handleNameValueChange} className='mt-5'>
              <label htmlFor='name' className='m-5 font-semibold'>
                이름
              </label>
              <input
                type='text'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='이름을 입력하세요'
                className={inputFont}
              />
            </form>
            {/* 별명 */}
            <form onSubmit={handleAddressValueChange} className='mt-3'>
              <label htmlFor='nickname' className='mx-5 font-semibold'>
                별명
              </label>
              <input
                id='nickname'
                type='text'
                value={nickName}
                className={inputFont}
                onChange={(e) => setNickName(e.target.value)}
                placeholder='별명을 입력하세요'
              />
            </form>
            {/* 위치 */}
            <form onSubmit={handleAddressValueChange} className='mt-3'>
              <label htmlFor='address' className='mx-5 font-semibold'>
                위치
              </label>
              <input
                id='address'
                type='text'
                value={address}
                className={inputFont}
                onChange={(e) => setAddress(e.target.value)}
                placeholder='주소를 입력하세요'
              />
            </form>
            {/* 폰번호 */}
            <form onSubmit={handleBioValueChange} className='mt-3'>
              <label htmlFor='phone' className='mx-5 font-semibold'>
                번호
              </label>
              <input
                id='phone'
                type='tel'
                value={phone}
                className={inputFont}
                onChange={(e) => setPhone(e.target.value)}
                placeholder='휴대폰 번호를 입력하세요'
              />
            </form>
            {/* 소개 */}
            <form onSubmit={handleBioValueChange} className='mt-3'>
              <label htmlFor='introduce ' className='top absolute mx-5 font-semibold'>
                소개
              </label>
              <input
                id='introduce'
                type='text'
                value={bio}
                className='top mx-2 ml-[80px] h-[170px] w-[250px] bg-pink-100 py-10 align-text-top text-gray-500'
                onChange={(e) => setBio(e.target.value)}
                placeholder='소개를 입력하세요'
              />
              <br />
              <button onClick={onClick} className='float-end mt-3 font-semibold'>
                저장
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
