'use client';

export default function ProfileDelete({
  confirmDelete,
  imgDelete,
  handleImgDelete,
  setImgDelete,
  handleDelete,
  setConfirmDelete,
}) {
  return (
    <>
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
