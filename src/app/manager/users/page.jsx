export default function page() {
  return (
    <div className='overflow-x-auto'>
      <div className='flex flex-col'>
        <div className='-my-2 overflow-x-auto'>
          <div className='inline-block min-w-full py-2 align-middle'>
            <div className='overflow-hidden border-b border-gray-200 shadow'>
              <div className='bg-gray-900 px-4 py-3 text-white'>
                <div className='grid grid-cols-4 gap-2'>
                  <div className='px-4 py-2'>이메일</div>
                  <div className='px-4 py-2'>닉네임</div>
                  <div className='px-4 py-2'>가입일</div>
                  <div className='px-4 py-2'>관리</div>
                </div>
              </div>
              <div className='divide-y divide-gray-200 bg-gray-100'>
                <div className='grid grid-cols-4 gap-2'>
                  <div className='px-4 py-4'>test@naver.com</div>
                  <div className='px-4 py-4'>어쩌구저쩌구</div>
                  <div className='px-4 py-4'>2023-03-15</div>
                  <div className='px-4 py-4'>
                    <button className='rounded bg-blue-500 px-2 py-1 font-bold text-white hover:bg-blue-700'>
                      해제
                    </button>
                    <button className='rounded bg-red-500 px-2 py-1 font-bold text-white hover:bg-red-700'>삭제</button>
                  </div>
                </div>
                <div className='grid grid-cols-4 gap-2 bg-gray-200'>
                  <div className='px-4 py-4'>2</div>
                  <div className='px-4 py-4'>example2@example.com</div>
                  <div className='px-4 py-4'>2023-03-16</div>
                  <div className='px-4 py-4'>
                    <button className='rounded bg-blue-500 px-2 py-1 font-bold text-white hover:bg-blue-700'>
                      편집
                    </button>
                    <button className='rounded bg-red-500 px-2 py-1 font-bold text-white hover:bg-red-700'>삭제</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
