'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
//token값 받아옴
import { tokenState } from '@/atoms/tokenState';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userNameState, userPhoneState, userNickNameState, userIdState } from '@/atoms/userInfoState';
export default function MyProfile() {
  const [name, setName] = useRecoilState(userNameState);
  const [nickName, setNickName] = useRecoilState(userNickNameState);
  const [userId, setUserId] = useRecoilState(userIdState);
  const [bio, setBio] = useState('홍박사님을아세요?');
  const [phone, setPhone] = useRecoilState(userPhoneState);
  //token값 받아옴
  const token = useRecoilValue(tokenState);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/member/userinfo', {
          withCredentials: true,
          headers: {
            Authorization: token,
          },
        });
        if (res.status === 200) {
          setName(res.data.name);
          setNickName(res.data.nickname);
          setPhone(res.data.phone);
          setUserId(res.data.id);
        }
      } catch (error) {
        console.error(error);
        alert('Error: 데이터를 불러올 수 없습니다');
      }
    };
    // 데이터를 가져오는 함수 호출
    fetchData();

    // cleanup 함수 (optional)
    return () => {};
  }, []);
  const btnStyle = 'ml-8  w-[150px] rounded-lg border border-black bg-pink-100 font-semibold p-1';
  const inputFont = 'mx-2 w-[400px] bg-pink-100 text-gray-500 border border-black p-1';
  //API로 받아올 값
  const handleNameValueChange = (e) => {
    e.preventDefault();
    console.log('이름이 변경됨');
    //이름변경 저장소
  };
  const handleAddressValueChange = (e) => {
    e.preventDefault();
    //d
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
  const onSave = (e) => {
    set;
    alert('저장되었습니다.');
  };

  return (
    <>
      <div className='flex w-full flex-col'>
        <h1 className='mb-5 text-2xl font-bold '>🙋‍♂️마이 프로필</h1>
        <div className='mb-10 border border-pink-200'></div>

        <div className='mx-auto flex h-full w-full rounded-2xl border border-pink-200'>
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
              <button className={btnStyle}>변경</button>
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
              <button className={btnStyle}>변경</button>
            </form>
            {/* 아이디 */}
            <form onSubmit={handleAddressValueChange} className='mt-3'>
              <label htmlFor='id' className='mx-5 font-semibold'>
                아디
              </label>
              <input
                id='id'
                type='text'
                value={userId}
                className={inputFont}
                onChange={(e) => setUserId(e.target.value)}
                placeholder='아이디를 입력하세요'
              />
              <button className={btnStyle}>변경</button>
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
              <button className={btnStyle}>변경</button>
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
                className='top mx-2 ml-[80px] h-[170px] w-[400px] border border-black bg-pink-100 py-10 align-text-top text-gray-500'
                onChange={(e) => setBio(e.target.value)}
                placeholder='소개를 입력하세요'
              />
              <button className={btnStyle}>변경</button>
            </form>
            <button onClick={onSave} className='float-end mt-3 font-semibold'>
              저장
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
