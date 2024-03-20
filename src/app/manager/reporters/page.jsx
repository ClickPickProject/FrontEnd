import ReportersSearch from './ReportersSearch';

export default function page() {
  return (
    <>
      <div className='ml-8 flex flex-col'>
        <div className='flex flex-col gap-2 p-2'>
          <h2 className='text-2xl font-bold'>🚨 신고자 관리</h2>
          <p className='mb-4 text-sm opacity-50'>들어온 신고를 처리하는 곳입니다.</p>
        </div>
        <ReportersSearch />
        <div className='mx-auto flex flex-col'>
          <div className='overflow-hidden rounded-lg border-b border-gray-200 shadow'>
            <div className='bg-violet-300 py-3 text-black'>
              <div className='grid grid-cols-7 gap-2 text-center [&>*]:font-bold'>
                <div className='px-4 py-2'>신고 유형</div>
                <div className='px-4 py-2'>신고자 닉네임</div>
                <div className='px-4 py-2'>피신고자 닉네임</div>
                <div className='px-4 py-2'>신고사유</div>
                <div className='px-4 py-2'>정지 기간</div>
                <div className='px-4 py-2'>상태</div>
                <div className='px-4 py-2'>처리</div>
              </div>
            </div>
            <div className='divide-y divide-pink-100 bg-pink-100'>
              <div className='grid grid-cols-7 gap-2 text-center'>
                <div className='px-4 py-4'>게시글</div>
                <div className='px-4 py-4'>경찰</div>
                <div className='px-4 py-4'>악질 유저1</div>
                <div className='px-4 py-4'>부적절한 행동</div>
                <div className='px-4 py-4'>24-04-15 ~ 24-04-20</div>
                <div className='px-4 py-4'>정지됨</div>
                <div className='mx-auto flex gap-2 px-4 py-4'>
                  <button className='rounded bg-blue-500 px-2 py-1 font-bold text-white hover:bg-blue-700'>승인</button>
                  <button className='rounded bg-red-500 px-2 py-1 font-bold text-white hover:bg-red-700'>거부</button>
                </div>
              </div>
              <div className='grid grid-cols-7 gap-2 bg-pink-200 text-center'>
                <div className='px-4 py-4'>댓글</div>
                <div className='px-4 py-4'>경찰</div>
                <div className='px-4 py-4'>악질 유저2</div>
                <div className='px-4 py-4'>도배</div>
                <div className='px-4 py-4'>24-04-15 ~ 24-04-20</div>
                <div className='px-4 py-4'>활동중</div>
                <div className='mx-auto flex gap-2 px-4 py-4'>
                  <button className='rounded bg-blue-500 px-2 py-1 font-bold text-white hover:bg-blue-700'>승인</button>
                  <button className='rounded bg-red-500 px-2 py-1 font-bold text-white hover:bg-red-700'>거부</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
