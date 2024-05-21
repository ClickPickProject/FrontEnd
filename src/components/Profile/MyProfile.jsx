'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { tokenState } from '@/atoms/tokenState';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userNameState, userPhoneState, userNickNameState, userIdState, userImgState } from '@/atoms/userInfoState';
import Loading from '../Loading';
import { LogoutIcon } from '@/components/UI/Icons';
import ProfileDelete from './ProfileDelete';
import { IoImagesOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { pageState } from '@/atoms/pageState';
import { pageDeleteModal } from '@/atoms/pageState';
import { axiosInstance } from '../utils/Axios';
export default function MyProfile() {
  const router = useRouter();
  const [name, setName] = useRecoilState(userNameState);
  const [nickName, setNickName] = useRecoilState(userNickNameState);
  const [userId, setUserId] = useRecoilState(userIdState);
  const [handleDelete, setHandleDelete] = useRecoilState(pageDeleteModal);
  const [phone, setPhone] = useRecoilState(userPhoneState);
  const [image, setImage] = useState('');
  const [userImg, setUserImg] = useRecoilState(userImgState);
  //token값 받아옴
  const token = useRecoilValue(tokenState);

  //유저 정보 받아오기
  const { data, isPending, isError } = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get('/api/member/userinfo', {
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
  // 유저 이미지 받아오기
  const { data1, isPending1, isError1 } = useQuery({
    queryKey: ['proImg'],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get('/api/profile/image', {
          headers: {
            Authorization: token,
          },
        });
        if (res.status === 200) {
          setImage(res.data.url);
          setUserImg(res.data.url);
        }
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  // //프로필사진 삭제
  const [imgDelete, setImgDelete] = useState(false); // 탈퇴 확인 상태를 저장하는 상태 변수
  const handleImgDelete = async (e) => {
    e.preventDefault();
    if (!imgDelete) {
      setImgDelete(true); // 확인 버튼을 누르기 전에 확인 메시지를 표시
    } else {
      try {
        const res = await axiosInstance.delete('/api/member/profile/image', {
          headers: {
            Authorization: token,
          },
        });
        if (res.status === 200) {
          toast.success(`프로필 사진이 삭제되었습니다.`, {
            position: 'top-right',
          });
        }
      } catch (err) {
        toast.error('프로필 사진을 삭제 할 수 없습니다.', {
          position: 'top-right',
        });
      }
    }
  };
  // 닉네임변경
  const handleNickNameChange = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.get(`/api/member/new-nickname/${nickName}`, {
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200) {
        setNickName(nickName);
        toast.success(`닉네임이 ${nickName}으로 변경되었습니다.`, {
          position: 'top-right',
        });
      }
    } catch (err) {
      console.log(err);
      toast.error('닉네임 변경 오류가 발생되었습니다.', {
        position: 'top-right',
      });
    }
  };
  //휴대폰 번호 변경
  const handlePhoneChange = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.get(`/api/member/new-phone-number/${phone}`, {
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200) {
        setPhone(phone);
        toast.success(`전화번호가 ${phone}으로 변경되었습니다.`, {
          position: 'top-right',
        });
      }
    } catch (err) {
      toast.error('전화번호 변경 오류가 발생되었습니다.', {
        position: 'top-right',
      });
    }
  };

  //style값
  const inputFont =
    'w-full rounded-lg p-2 font-semibold hover:border-2 hover:border-black hover:border disabled:bg-white';
  const labelStyle = 'p-2 whitespace-nowrap opacity-70 flex font-semibold ';

  //이미지변경

  const handleInputImg = async (e) => {
    e.preventDefault();
    // 파일이 있는지 확인
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    console.log(e.target.files);
    // setImage(e)
    try {
      const res = await axiosInstance.post(`/api/member/profile/image`, formData, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.status === 200) {
        toast.success(`이미지가 변경 되었습니다.`, {
          position: 'top-right',
        });
      }
    } catch (err) {
      toast.error('이미지 업로드 오류가 발생되었습니다.', {
        position: 'top-right',
      });
    }
  };

  if (isPending || isError) return <Loading isPending={isPending} isError={isError} />;
  if (isPending1 || isError1) return <Loading isPending={isPending1} isError={isError1} />;
  return (
    <div className='mx-6'>
      <section className='  flex h-full w-[inherit] flex-col justify-center text-sm'>
        <div className='flex flex-col gap-2 p-2'>
          <h2 className='mt-5 text-2xl font-bold sm:text-center'>🙋‍♂️ 마이 프로필</h2>
          <p className='mb-4 text-sm opacity-50 sm:text-center'>나의 프로필을 자유롭게 꾸며보세요.</p>
        </div>
        <div className='mb-4 border border-pink-200' />

        <div className='mx-auto flex w-full flex-col items-center justify-center'>
          <form action='' className='flex h-full w-full flex-col rounded-full'>
            <div className='flex flex-col items-center justify-center'>
              <label htmlFor='file' className=' absolute z-10 flex h-[300px] w-[300px] cursor-pointer'></label>
              <img
                src={image}
                alt='#'
                className='mx-auto mb-2 h-[300px] w-[300px] rounded-full border-4 border-white shadow-xl '
              />
              <input type='file' id='file' onChange={handleInputImg} accept='image/png, image/jpg' className='hidden' />
              <button
                onClick={handleImgDelete}
                className='mt-2 flex items-center justify-center gap-2 rounded-lg p-1 font-semibold text-black opacity-70'
              >
                <IoImagesOutline size={18} />
                기본프로필로 변경
              </button>
            </div>
          </form>
        </div>

        <div className='mt-5 flex w-full flex-col items-center justify-center'>
          {/* 이름 */}
          <form className='mt-5 flex w-2/3 items-center'>
            <label htmlFor='name' className={labelStyle}>
              이름 :
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
          <form className='mt-5 flex w-2/3 items-center'>
            <label htmlFor='id' className={labelStyle}>
              메일 :
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
          <form onSubmit={handleNickNameChange} className='mt-5 flex w-2/3 items-center'>
            <label htmlFor='nickname' className={labelStyle}>
              별명 :
            </label>
            <div className='flex w-full items-center justify-center gap-2 '>
              <input
                id='nickname'
                type='text'
                value={nickName}
                className={inputFont}
                onChange={(e) => setNickName(e.target.value)}
                placeholder='별명을 입력하세요'
              />{' '}
              <button className=' w-[70px] justify-center rounded-lg p-2 font-semibold opacity-70 hover:bg-black hover:text-white hover:shadow-inner'>
                변경
              </button>
            </div>
          </form>

          {/* 폰번호 */}
          <form onSubmit={handlePhoneChange} className='mt-5 flex w-2/3 items-center'>
            <label htmlFor='phone' className={labelStyle}>
              번호 :
            </label>

            <div className='flex w-full items-center justify-center gap-2 '>
              <input
                id='phone'
                type='tel'
                value={phone}
                className={inputFont}
                onChange={(e) => setPhone(e.target.value)}
                placeholder='휴대폰 번호를 입력하세요'
              />
              <button className='w-[70px] justify-center rounded-lg p-2 font-semibold opacity-70 hover:bg-black hover:text-white hover:shadow-inner'>
                변경
              </button>
            </div>
          </form>
          <button
            onClick={() => setHandleDelete((Delete) => !Delete)}
            className='mx-auto mt-12 flex items-center gap-2 font-semibold opacity-70'
          >
            <LogoutIcon size={18} />
            회원탈퇴
          </button>
        </div>
        {!handleDelete && <ProfileDelete nickName={nickName} image={image} />}
      </section>
    </div>
  );
}
