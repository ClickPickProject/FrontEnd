'use client';
import ReportersSearch from '../reporters/ReportersSearch';
import UserList from './UserList';
import Select from 'react-select';

export default function page() {
  return (
    <>
      <div className='flex flex-col px-8'>
        <div className='flex flex-col gap-2 p-2'>
          <h2 className='text-2xl font-bold'>👥 사용자 관리</h2>
          <p className='mb-4 text-sm opacity-50'>사용자를 관리하는 곳입니다.</p>
        </div>
        {/* <ReportersSearch /> */}
        <div className='flex cursor-pointer gap-4 py-4 text-sm'>
          <Select
            options={[
              { value: '일반', label: '일반' },
              { value: '정지됨', label: '정지됨' },
            ]}
            defaultValue='일반'
            className='w-48 '
            placeholder='사용자 상태'
            isSearchable={false}
          />
        </div>
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
              <UserList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
