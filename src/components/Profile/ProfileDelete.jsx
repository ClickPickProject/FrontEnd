'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { LogoutIcon } from '@/components/UI/Icons';
import { pageState } from '@/atoms/pageState';
import { pageDeleteModal } from '@/atoms/pageState';
import { useRecoilValue, useRecoilState } from 'recoil';

export default function ProfileDelete({ image, nickName }) {
  const [handleDelete, setHandleDelete] = useRecoilState(pageDeleteModal);

  //회원탈퇴
  const handleDeleteId = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete('/api/member', {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200) {
        toast.success(`탈퇴되었습니다.`, {
          position: 'top-right',
        });
        router.replace('/');
      }
    } catch (err) {
      toast.error('이미 탈퇴된 회원이거나 오류가 발생하였습니다.', {
        position: 'top-right',
      });
    }
  };
  return (
    <>
      <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
        <div className='absolute inset-0 bg-black opacity-20'></div>
      </div>
      {/* 탈퇴 확인 */}
      <div className='absolute inset-0 z-[50] flex h-full w-full  items-center justify-center  '>
        <div className='mx-auto flex flex-col rounded-2xl bg-white p-5 shadow-2xl md:text-sm'>
          {' '}
          <div className='flex flex-col text-center'>
            <p className='mb-2 text-xl font-semibold'>😂️{nickName}님 클릭픽과의 여행을 멈추시겠습니까?😂️</p>
            <img
              src={image}
              className='mx-auto mb-2 h-[150px] w-[150px] rounded-full border-4 border-white shadow-xl'
              alt='profile'
            />
            😿
            <p>{nickName}님 그 간 함께해온 추억들이 있습니다.</p>
            <p>같이 보러가시겠습니까?</p>
          </div>
          <div className='flex w-full justify-center'>
            <button onClick={() => handleDeleteId} className='p-2 font-bold hover:opacity-50'>
              탈퇴
            </button>
            <button onClick={() => setHandleDelete((Delete) => !Delete)} className='p-2 font-bold hover:opacity-50'>
              보기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
