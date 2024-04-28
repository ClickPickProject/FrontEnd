'use client';
import { useEffect } from 'react';
import UserList from './UserList';
import Select from 'react-select';
import { useRecoilState } from 'recoil';
import { filterUserStatusState } from '@/atoms/managerState';
import BannedUserList from './BannedUserList';
import NormalUserList from './NormalUserList';
import { motion } from 'framer-motion';

export default function UsersPage() {
  useEffect(() => {
    setFilterUserStatus({ value: 'ALL', label: '모두' });
  }, []);
  const [filterUserStatus, setFilterUserStatus] = useRecoilState(filterUserStatusState);
  return (
    <>
      <div className='flex flex-col px-8'>
        <div className='flex flex-col gap-2 p-2'>
          <h2 className='text-2xl font-bold'>👥 사용자 관리</h2>
          <p className='mb-4 text-sm opacity-50'>사용자를 관리하는 곳입니다.</p>
        </div>
        <div className='flex cursor-pointer gap-4 py-4 text-sm'>
          <Select
            options={[
              { value: 'ALL', label: '모두' },
              { value: 'NORMAL', label: '일반' },
              { value: 'BAN', label: '정지됨' },
            ]}
            defaultValue='ALL'
            className='w-48 '
            placeholder='사용자 상태'
            isSearchable={false}
            onChange={setFilterUserStatus}
          />
        </div>
        {filterUserStatus.value === 'ALL' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, delay: 0.5 }}
            className='mx-auto flex w-full flex-col'
          >
            <div className='overflow-hidden rounded-sm border-b border-gray-200 shadow'>
              <div className='bg-pink-300 text-black'>
                <div className='grid grid-cols-6 gap-2 py-2 text-center text-sm [&>*]:font-semibold'>
                  <div className=''>아이디</div>
                  <div className=''>이름</div>
                  <div className=''>닉네임</div>
                  <div className=''>연락처</div>
                  <div className=''>가입일</div>
                  <div className=''>상태</div>
                </div>
              </div>
              <div className='flex flex-col items-center divide-y divide-pink-100 bg-gray-100 text-sm '>
                <UserList />
              </div>
            </div>
          </motion.div>
        )}
        {filterUserStatus.value === 'NORMAL' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, delay: 0.5 }}
            className='mx-auto flex w-full flex-col'
          >
            <div className='overflow-hidden rounded-sm border-b border-gray-200 shadow'>
              <div className='bg-pink-300 text-black'>
                <div className='grid grid-cols-5 gap-2 py-2 text-center text-sm [&>*]:font-semibold'>
                  <div className=''>아이디</div>
                  <div className=''>이름</div>
                  <div className=''>닉네임</div>
                  <div className=''>연락처</div>
                  <div className=''>가입일</div>
                </div>
              </div>
              <div className='flex flex-col items-center divide-y divide-pink-100 bg-gray-100 text-sm '>
                <NormalUserList />
              </div>
            </div>
          </motion.div>
        )}
        {filterUserStatus.value === 'BAN' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, delay: 0.5 }}
            className='mx-auto flex w-full flex-col'
          >
            <div className='overflow-hidden rounded-sm border-b border-gray-200 shadow'>
              <div className='bg-pink-300 text-black'>
                <div className='grid grid-cols-5 gap-2 py-2 text-center text-sm [&>*]:font-semibold'>
                  <div className=''>아이디</div>
                  <div className=''>이름</div>
                  <div className=''>닉네임</div>
                  <div className=''>연락처</div>
                  <div className=''>정지 기간</div>
                </div>
              </div>
              <div className='flex flex-col items-center divide-y divide-pink-100 bg-gray-100 text-sm '>
                <BannedUserList />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}
