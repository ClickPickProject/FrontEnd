'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { tokenState } from '@/atoms/tokenState';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userNameState, userPhoneState, userNickNameState, userIdState } from '@/atoms/userInfoState';
export default function MyProfile() {
  const router = useRouter();
  const [name, setName] = useRecoilState(userNameState);
  const [nickName, setNickName] = useRecoilState(userNickNameState);
  const [userId, setUserId] = useRecoilState(userIdState);
  const [bio, setBio] = useState('홍박사님을아세요?');
  const [phone, setPhone] = useRecoilState(userPhoneState);
  const [nickNameDisabled, setNickNameDisabled] = useState(false);
  const [phoneDisabled, setPhoneDisabled] = useState(false);
  const [clickPhoneCount, setClickPhoneCount] = useState(1);
  const [clickNickNameCount, setClickNickNameCount] = useState(1);
  //token값 받아옴
  const token = useRecoilValue(tokenState);
  //유저 정보 받아오기
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

  //회원탈퇴
  const [confirmDelete, setConfirmDelete] = useState(false); // 탈퇴 확인 상태를 저장하는 상태 변수
  const handleDelete = async (e) => {
    e.preventDefault();
    if (!confirmDelete) {
      setConfirmDelete(true); // 확인 버튼을 누르기 전에 확인 메시지를 표시
    } else {
      try {
        const res = await axios.delete('/api/member', {
          withCredentials: true,
          headers: {
            Authorization: token,
          },
        });
        if (res.status === 200) {
          console.log('탈퇴완료');
          alert('회원이 탈퇴 되셨습니다');
          router.push('/');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  // // 프로필 사진 추가/변경
  // const handleProfileImage = async (e) => {
  //   setNickNameDisabled((value) => !value);
  //   e.preventDefault();
  //    try {
  //       const res = await axios.post(`/api/member/profileimage`,
  //       { image :  },
  //       {
  //         withCredentials: true,
  //         headers: {
  //           Authorization: token,
  //         },
  //       });
  //       if (res.status === 200) {
  //         setNickName(nickName);
  //         console.log(nickName);
  //         alert('닉네임이 변경되었습니다.');
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       alert('이미 사용자가 사용중인 닉네임 입니다.');
  //     }
  //   }
  //   setClickNickNameCount((prevCount) => prevCount + 1);
  // };
  // 닉네임변경
  const handleNickNameChange = async (e) => {
    setNickNameDisabled((value) => !value);
    e.preventDefault();
    if (clickNickNameCount % 2 === 0) {
      try {
        const res = await axios.get(`/api/member/new-nickname/${nickName}`, {
          withCredentials: true,
          headers: {
            Authorization: token,
          },
        });
        if (res.status === 200) {
          setNickName(nickName);
          console.log(nickName);
          alert('닉네임이 변경되었습니다.');
        }
      } catch (err) {
        console.log(err);
        alert('이미 사용자가 사용중인 닉네임 입니다.');
      }
    }
    setClickNickNameCount((prevCount) => prevCount + 1);
  };
  //휴대폰 번호 변경
  const handlePhoneChange = async (e) => {
    e.preventDefault();
    setPhoneDisabled((value) => !value);
    if (clickPhoneCount % 2 === 0) {
      try {
        const res = await axios.get(`/api/member/new-phone-number/${phone}`, {
          withCredentials: true,
          headers: {
            Authorization: token,
          },
        });
        if (res.status === 200) {
          setPhone(phone);
          console.log(phone);
          alert('휴대폰 번호가 변경되었습니다.');
          router.push('/');
        }
      } catch (err) {
        console.log(err);
        alert('이미 사용자가 사용중인 휴대폰 번호 입니다.');
      }
    }
    setClickPhoneCount((prevCount) => prevCount + 1);
  };

  //style값
  const btnStyle = 'ml-8  w-[150px] rounded-lg border border-black bg-pink-100 font-semibold p-1';
  const inputFont =
    'mx-2 w-[400px] bg-pink-100 text-gray-500 border border-black p-1 disabled:bg-pink-300 disabled:font-semibold disabled:text-white';
  //API로 받아올 값

  //이미지변경
  const handleInputImg = (e) => {
    e.preventDefault();
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
                onClick={handleDelete}
                className='my-5 ml-8  w-[150px] rounded-lg border border-black bg-pink-100 font-semibold'
              >
                회원탈퇴
              </button>
              {confirmDelete && ( // 확인 버튼을 누르기 전에만 메시지를 표시
                <div>
                  <p>정말로 탈퇴하시겠습니까?</p>
                  <button className='p-2 font-bold' onClick={() => setConfirmDelete(false)}>
                    취소{' '}
                  </button>
                  <button className='p-2 font-bold' onClick={handleDelete}>
                    {' '}
                    확인
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className='mx-auto'>
            {/* 이름 */}
            <form className='mt-5'>
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
                disabled
              />
            </form>
            {/* 아이디 */}
            <form className='mt-3'>
              <label htmlFor='id' className='mx-5 font-semibold'>
                메일
              </label>
              <input
                id='id'
                type='text'
                value={userId}
                className={inputFont}
                onChange={(e) => setUserId(e.target.value)}
                placeholder='메일을 입력하세요'
                disabled
              />
            </form>
            {/* 별명 */}
            <form onSubmit={handleNickNameChange} className='mt-3'>
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
                disabled={!nickNameDisabled}
              />
              <button className={btnStyle}>변경</button>
            </form>

            {/* 폰번호 */}
            <form onSubmit={handlePhoneChange} className='mt-3'>
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
                disabled={!phoneDisabled}
              />
              <button className={btnStyle}>변경</button>
            </form>
            {/* 소개 */}
            <form className='mt-3'>
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
