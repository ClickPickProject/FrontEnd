'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { tokenState } from '@/atoms/tokenState';
import { useRecoilValue, useRecoilState } from 'recoil';
import { pageOpacity } from '@/atoms/pageState';
import { userNameState, userPhoneState, userNickNameState, userIdState } from '@/atoms/userInfoState';
import Loading from '../Loading';
import { LogoutIcon } from '@/components/UI/Icons';
import ProfileDelete from './ProfileDelete';
import { IoImagesOutline } from 'react-icons/io5';

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
  const [image, setImage] = useState('');
  const [opacity, setOpacity] = useRecoilState(pageOpacity);
  //token값 받아옴
  const token = useRecoilValue(tokenState);

  //유저 정보 받아오기
  const { data, isPending, isError } = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
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
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  const { data1, isPending1, isError1 } = useQuery({
    queryKey: ['proImg'],
    queryFn: async () => {
      try {
        const res = await axios.get('/api/profile/image/', {
          withCredentials: true,
          headers: {
            Authorization: token,
          },
        });
        if (res.status === 200) {
          setImage(res.data.url);
        }
        return res.data;
      } catch (error) {
        console.log(error);
      }
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
    // if (!isFormValid()) return;
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
  const inputFont = 'w-full rounded-lg bg-pink-100 px-2 p-2 font-semibold hover:bg-pink-400 ';
  //API로 받아올 값
  const labelStyle = 'whitespace-nowrap mb-2 opacity-70 flex font-semibold sm:justify-center sm:font-bold sm:text-base';

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

  if (isPending || isError) return <Loading isPending={isPending} isError={isError} />;
  if (isPending1 || isError1) return <Loading isPending={isPending1} isError={isError1} />;
  if (confirmDelete || imgDelete) {
    setOpacity('opacity-50');
  } else setOpacity('');
  return (
    <div className=' mr-[40px]'>
      <section className='flex h-full w-[inherit] flex-col justify-center text-sm'>
        <div className='flex flex-col gap-2 p-2'>
          <h2 className='mt-5 text-2xl font-bold sm:text-center'>🙋‍♂️ 마이 프로필</h2>
          <p className='mb-4 text-sm opacity-50 sm:text-center'>나의 프로필을 자유롭게 꾸며보세요.</p>
        </div>
        <div className='mb-4 border border-pink-200' />
        <div className='relative mx-auto flex h-full w-full justify-around rounded-2xl border border-pink-200 px-5 lg:flex-col md:flex-col'>
          <div className='mx-auto flex w-full flex-col items-center justify-center'>
            <form action=''>
              <div>
                <img
                  src={image}
                  alt='#'
                  className='mx-auto mb-2 h-[150px] w-[150px] rounded-full border-4 border-white shadow-xl '
                />
                <br />
                <label
                  htmlFor='file'
                  className='mb-5 flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-pink-100  p-3 font-semibold hover:bg-pink-300  hover:shadow-inner'
                >
                  <IoImagesOutline size={18} />
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
              <div className='flx-row flex gap-6'>
                <button
                  onClick={handleDelete}
                  className='flex items-center justify-center gap-2 whitespace-nowrap rounded-lg  bg-pink-100  p-3 font-semibold hover:bg-pink-300 hover:shadow-inner md:w-28 sm:w-28'
                >
                  <LogoutIcon size={18} />
                  회원탈퇴
                </button>
                <button
                  onClick={handleImgDelete}
                  className='flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-pink-100 p-3  font-semibold hover:bg-pink-300 hover:shadow-inner md:w-28 sm:w-28'
                >
                  <IoImagesOutline size={18} />
                  사진삭제
                </button>
              </div>
            </div>
          </div>

          <div className='mt-5 w-full'>
            {/* 이름 */}
            <form className='mt-5'>
              <label htmlFor='name' className={labelStyle}>
                이름
              </label>
              <div>
                <input
                  type='text'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='이름을 입력하세요'
                  className={inputFont}
                  disabled
                />
              </div>
            </form>

            {/* 아이디 */}
            <form className='mt-3'>
              <label htmlFor='id' className={labelStyle}>
                메일
              </label>
              <div>
                <input
                  id='id'
                  type='text'
                  value={userId}
                  className={inputFont}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder='메일을 입력하세요'
                  disabled
                />
              </div>
            </form>
            {/* const btnStyle =
    ''; */}

            {/* 별명 */}
            <form onSubmit={handleNickNameChange} className='mt-3'>
              <label htmlFor='nickname' className={labelStyle}>
                별명
              </label>
              <div>
                <div className='flex w-full items-center justify-center gap-1 '>
                  <input
                    id='nickname'
                    type='text'
                    value={nickName}
                    className={inputFont}
                    onChange={(e) => setNickName(e.target.value)}
                    placeholder='별명을 입력하세요'
                  />{' '}
                  <button className=' w-[70px] justify-center rounded-lg bg-pink-100 p-2 font-semibold hover:bg-pink-300 hover:shadow-inner'>
                    변경
                  </button>
                </div>
              </div>
            </form>

            {/* 폰번호 */}
            <form onSubmit={handlePhoneChange} className='mt-3'>
              <label htmlFor='phone' className={labelStyle}>
                번호
              </label>

              <div>
                <div className='mb-2 flex w-full items-center justify-center gap-2 '>
                  <input
                    id='phone'
                    type='tel'
                    value={phone}
                    className={inputFont}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder='휴대폰 번호를 입력하세요'
                  />
                  <button className='w-[70px] justify-center rounded-lg  bg-pink-100 p-2  font-semibold hover:bg-pink-300 hover:shadow-inner '>
                    변경
                  </button>
                </div>
              </div>
            </form>
          </div>
          <ProfileDelete
            confirmDelete={confirmDelete}
            imgDelete={imgDelete}
            handleDelete={handleDelete}
            setImgDelete={setImgDelete}
            handleImgDelete={handleImgDelete}
            setConfirmDelete={setConfirmDelete}
          />
        </div>
      </section>
    </div>
  );
}
