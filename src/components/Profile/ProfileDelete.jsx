'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProfileDelete({
  confirmDelete,
  imgDelete,
  handleImgDelete,
  setImgDelete,
  handleDelete,
  setConfirmDelete,
}) {
  // //프로필사진 삭제
  // const [imgDelete, setImgDelete] = useState(false); // 탈퇴 확인 상태를 저장하는 상태 변수
  // const handleImgDelete = async (e) => {
  //   e.preventDefault();
  //   if (!imgDelete) {
  //     setImgDelete(true); // 확인 버튼을 누르기 전에 확인 메시지를 표시
  //   } else {
  //     try {
  //       const res = await axios.delete('/api/member/profile/image', {
  //         withCredentials: true,
  //         headers: {
  //           Authorization: token,
  //         },
  //       });
  //       if (res.status === 200) {
  //         toast.success(`프로필 사진이 삭제되었습니다.`, {
  //           position: 'top-right',
  //         });
  //       }
  //     } catch (err) {
  //       toast.error('프로필 사진을 삭제 할 수 없습니다.', {
  //         position: 'top-right',
  //       });
  //     }
  //   }
  // };
  // //회원탈퇴
  // const [confirmDelete, setConfirmDelete] = useState(false); // 탈퇴 확인 상태를 저장하는 상태 변수
  // const handleDelete = async (e) => {
  //   e.preventDefault();
  //   if (!confirmDelete) {
  //     setConfirmDelete(true); // 확인 버튼을 누르기 전에 확인 메시지를 표시
  //   } else {
  //     try {
  //       const res = await axios.delete('/api/member', {
  //         withCredentials: true,
  //         headers: {
  //           Authorization: token,
  //         },
  //       });
  //       if (res.status === 200) {
  //         toast.success(`회원이 탈퇴되었습니다.`, {
  //           position: 'top-right',
  //         });
  //         router.replace('/');
  //       }
  //     } catch (err) {
  //       toast.error('이미 탈퇴된 회원이거나 오류가 발생하였습니다.', {
  //         position: 'top-right',
  //       });
  //     }
  //   }
  // };
  return (
    <>
      <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
        <div className='absolute inset-0 bg-black opacity-20'></div>
      </div>
      {/* 탈퇴 확인 */}
      {confirmDelete && (
        <div className='absolute flex h-full w-full  items-center justify-center '>
          <div className='mx-auto flex flex-col rounded-md bg-white p-5 shadow-sm md:text-sm'>
            {' '}
            <div className='flex flex-col text-center'>
              <p className='mb-2 text-xl font-semibold text-pink-400'>정말로 탈퇴하시겠습니까?</p>
              <p>삭제된 후 계정은 복구할 수 없습니다.</p>
            </div>
            <div className='flex w-full justify-center'>
              <button className='p-2 font-bold hover:opacity-50' onClick={() => handleDelete}>
                확인
              </button>
              <button className='p-2 font-bold hover:opacity-50' onClick={() => setConfirmDelete(false)}>
                취소
              </button>
            </div>
          </div>
        </div>
      )}
      {/* 이미지 삭제 확인 */}
      {imgDelete && (
        <div className='absolute flex h-full w-full  items-center justify-center '>
          <div className='mx-auto flex flex-col rounded-md bg-white p-5 shadow-sm md:text-sm'>
            <div className='flex flex-col text-center'>
              <p className='mb-2 text-xl font-semibold text-pink-400'>정말로 사진을 삭제하시겠습니까?</p>
              <p>삭제된 후 사진은 복구할 수 없습니다.</p>
            </div>
            <div className='flex w-full justify-center'>
              <button className='p-2 font-bold hover:opacity-50' onClick={handleImgDelete}>
                확인
              </button>
              <button className='p-2 font-bold hover:opacity-50' onClick={() => setImgDelete(false)}>
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
