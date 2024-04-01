'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { tokenState } from '@/atoms/tokenState';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userNameState, userPhoneState, userNickNameState, userIdState } from '@/atoms/userInfoState';
import Loading from '../Loading';
export default function MyProfile() {
  const router = useRouter();
  const [name, setName] = useRecoilState(userNameState);
  const [nickName, setNickName] = useRecoilState(userNickNameState);
  const [userId, setUserId] = useRecoilState(userIdState);

  const [phone, setPhone] = useRecoilState(userPhoneState);
  const [nickNameDisabled, setNickNameDisabled] = useState(false);
  const [phoneDisabled, setPhoneDisabled] = useState(false);
  const [clickPhoneCount, setClickPhoneCount] = useState(1);
  const [clickNickNameCount, setClickNickNameCount] = useState(1);
  const [image, setImage] = useState(null);
  //token값 받아옴
  const token = useRecoilValue(tokenState);
  //유저 정보 받아오기
  const {
    data: userInFo,
    isPending1,
    isError1,
  } = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
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
      return res.data;
    },
  });
  const {
    data: proImg,
    isPending2,
    isError2,
  } = useQuery({
    queryKey: ['proImg'],
    queryFn: async () => {
      const res = await axios.get('/api/member/profile/image', {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200) {
        setImage(res.data.url);
      }
      return res.data;
    },
  });

  //프로필사진 삭제
  const [imgDelete, setImgDelete] = useState(false); // 탈퇴 확인 상태를 저장하는 상태 변수
  const handleImgDelete = async (e) => {
    e.preventDefault();
    if (!imgDelete) {
      setImgDelete(true); // 확인 버튼을 누르기 전에 확인 메시지를 표시
    } else {
      try {
        const res = await axios.delete('/api/member/profile/image', {
          withCredentials: true,
          headers: {
            Authorization: token,
          },
        });
        if (res.status === 200) {
          console.log('이미지 삭제 완료');
          alert('이미지가 삭제 되셨습니다');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
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
  const btnStyle = 'mx-4  w-[70px] rounded-lg  bg-pink-100 font-semibold p-1 hover:shadow-inner';
  const inputFont =
    'mx-2 w-[350px] bg-pink-100 text-gray-500 border border-black p-1 disabled:bg-pink-300 disabled:font-semibold disabled:text-white';
  //API로 받아올 값

  //이미지변경

  const handleInputImg = async (e) => {
    e.preventDefault();
    // 파일이 있는지 확인
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    console.log(e.target.files);
    // setImage(e)
    try {
      const res = await axios.post(`/api/member/profile/image`, formData, {
        withCredentials: true,
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.status === 200) {
        console.log(res);
        alert('이미지가 업로드 되었습니다.');
      }
    } catch (err) {
      console.log(err);
      alert('이미지 업로드 오류발생!');
    }
  };

  const isPending = isPending1 || isPending2;
  const isError = isError1 || isError2;
  if (isPending || isError) return <Loading isPending={isPending} isError={isError} />;

  return (
    <>
      <section className='flex h-full w-[inherit] flex-col justify-center'>
        <div className='flex flex-col gap-2 p-2'>
          <h2 className='text-2xl font-bold'>🙋‍♂️ 마이 프로필</h2>
          <p className='mb-4 text-sm opacity-50'>나의 프로필을 자유롭게 꾸며보세요.</p>
        </div>
        <div className='mb-10 border border-pink-200' />
        <div className='mx-auto flex h-full w-full rounded-2xl border border-pink-200'>
          <div className='mx-auto'>
            <form action='' className='margin ml-8 mt-5'>
              <div>
                <img
                  src={image}
                  alt='#'
                  className='mx-auto mb-2 h-[150px] w-[150px] rounded-full border-4 border-white shadow-xl '
                />
                <br />
                <label
                  htmlFor='file'
                  className='mx-auto flex cursor-pointer justify-center rounded-lg border-black bg-pink-100 p-3 font-semibold  hover:shadow-inner'
                >
                  이미지 변경
                </label>

                <input
                  type='file'
                  id='file'
                  onChange={handleInputImg}
                  accept='image/png, image/jpg'
                  className='hidden'
                />
              </div>
            </form>
            <div className='mx-auto flex flex-col text-center'>
              <div className='my-2'></div>
              <br />
              <div className='ml-9'>
                <button
                  onClick={handleDelete}
                  className=' w-[150px] rounded-lg bg-pink-100 p-3 font-semibold  hover:shadow-inner'
                >
                  회원탈퇴
                </button>
                <button
                  onClick={handleImgDelete}
                  className='mb-3 ml-5 w-[150px] rounded-lg bg-pink-100 p-3 font-semibold  hover:shadow-inner'
                >
                  사진삭제
                </button>
              </div>
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
            {/* 탈퇴 확인 */}
            {confirmDelete && ( // 확인 버튼을 누르기 전에만 메시지를 표시
              <div className='mx-auto mb-2 flex rounded-md bg-pink-200 p-5 shadow-sm'>
                <p>정말로 탈퇴하시겠습니까?</p>
                <button className='flex-end p-2 font-bold hover:shadow-inner ' onClick={handleDelete}>
                  {' '}
                  확인
                </button>
                <button className='flex-end p-2  font-bold hover:shadow-inner' onClick={() => setConfirmDelete(false)}>
                  취소{' '}
                </button>
              </div>
            )}
            {/* 이미지 삭제 확인 */}
            {imgDelete && ( // 확인 버튼을 누르기 전에만 메시지를 표시
              <div className='mx-auto mb-2 flex rounded-md bg-pink-200 p-5 shadow-sm'>
                <p>정말로 사진을 삭제하시겠습니까?</p>
                <button className=' p-2 font-bold  hover:shadow-inner' onClick={handleImgDelete}>
                  {' '}
                  확인
                </button>
                <button className='p-2 font-bold  hover:shadow-inner' onClick={() => setImgDelete(false)}>
                  취소{' '}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
