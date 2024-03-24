import ReportersSearch from '../reporters/ReportersSearch';
import UserList from './UserList';

export default function page() {
  return (
    <>
      <div className='flex flex-col px-8'>
        <div className='flex flex-col gap-2 p-2'>
          <h2 className='text-2xl font-bold'>👥 사용자 관리</h2>
          <p className='mb-4 text-sm opacity-50'>사용자를 관리하는 곳입니다.</p>
        </div>
        <ReportersSearch />
        <div className='mx-auto flex w-full flex-col'>
          <div className='overflow-hidden rounded-md border-b border-gray-200 shadow'>
            <div className='bg-pink-300 text-black'>
              <div className='grid grid-cols-4 gap-2 py-2 text-center text-sm [&>*]:font-semibold'>
                <div className=''>아이디</div>
                <div className=''>닉네임</div>
                <div className=''>가입일</div>
                <div className=''>상태</div>
              </div>
            </div>
            <div className='flex flex-col items-center divide-y divide-pink-100 bg-gray-100 text-sm '>
              <div className='grid w-full grid-cols-4 gap-2 py-2 text-center'>
                <div className=''>tasdna@hanmail.net</div>
                <div className=''>맘스터치</div>
                <div className=''>2024-03-20</div>
                <div className=''>정지됨</div>
              </div>
              <UserList />
            </div>
          </div>
        </div>
        {/* <div className='mx-auto flex flex-col'>
          <div className='overflow-hidden rounded-lg border-b border-gray-200 shadow'>
            <div className='bg-violet-300 py-3 text-black'>
              <div className='grid grid-cols-4 gap-2 text-center [&>*]:font-bold'>
                <div className='px-4 py-2'>아이디</div>
                <div className='px-4 py-2'>닉네임</div>
                <div className='px-4 py-2'>가입일</div>
                <div className='px-4 py-2'>상태</div>
              </div>
            </div>
            <div className='divide-y divide-pink-100 bg-pink-100'>
              <div className='grid grid-cols-4 gap-2 text-center'>
                <div className='px-4 py-4'>test@naver.com</div>
                <div className='px-4 py-4'>하하하하</div>
                <div className='px-4 py-4'>24-04-15</div>
                <div className='px-4 py-4'>정지됨</div>
              </div>
              <div className='grid grid-cols-4 gap-2 bg-pink-200 text-center'>
                <div className='px-4 py-4'>test@gmail.com</div>
                <div className='px-4 py-4'>호호호호</div>
                <div className='px-4 py-4'>24-04-15</div>
                <div className='px-4 py-4'>활동중</div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
