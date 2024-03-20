'use client';
import { FillNoticeIcon, NoticeIcon } from '@/components/UI/Icons';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { IoHome } from 'react-icons/io5';
import { PiSirenFill } from 'react-icons/pi';

export default function DashboardPage() {
  const [users, setUsers] = useState([
    { id: 1, username: 'admin1', email: 'admin1@example.com' },
    { id: 2, username: 'admin2', email: 'admin2@example.com' },
    { id: 3, username: 'admin3', email: 'admin3@example.com' },
  ]);

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };
  const navStyle = `flex cursor-pointer items-center gap-4 rounded-xl px-8 py-4 text-gray-500 hover:bg-pink-200 hover:text-pink-500 transition-all`;
  return (
    <>
      {/* Main */}
      <main className='flex-1 p-4'>
        <div className='mx-auto mt-8 max-w-7xl px-4'>
          <div className='grid grid-cols-3 gap-6 lg:grid-cols-3 md:grid-cols-2'>
            {/* Card 1 */}
            <div className='rounded-xl bg-white p-6 shadow-md'>
              <h2 className='mb-2 text-xl font-semibold text-gray-800'>이용자 분석</h2>
              <p className='text-gray-600'>
                정부는 회계연도마다 예산안을 편성하여 회계연도 개시 90일전까지 국회에 제출하고, 국회는 회계연도 개시
                30일전까지 이를 의결하여야 한다.
              </p>
            </div>
            {/* Card 2 */}
            <div className='rounded-lg bg-white p-6 shadow-md'>
              <h2 className='mb-2 text-xl font-semibold text-gray-800'>메세지</h2>
              <p className='text-gray-600'>
                국회는 법률에 저촉되지 아니하는 범위안에서 의사와 내부규율에 관한 규칙을 제정할 수 있다.
              </p>
            </div>
            {/* Card 3 */}
            <div className='rounded-lg bg-white p-6 shadow-md'>
              <h2 className='mb-2 text-xl font-semibold text-gray-800'>신고목록</h2>
              <p className='text-gray-600'>
                국무총리 또는 행정각부의 장은 소관사무에 관하여 법률이나 대통령령의 위임 또는 직권으로 총리령 또는
                부령을 발할 수 있다.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
