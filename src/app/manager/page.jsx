'use client';
import React, { useState } from 'react';

export default function DashboardPage() {
  const [users, setUsers] = useState([
    { id: 1, username: 'admin1', email: 'admin1@example.com' },
    { id: 2, username: 'admin2', email: 'admin2@example.com' },
    { id: 3, username: 'admin3', email: 'admin3@example.com' },
  ]);

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <>
      <div className='flex min-h-screen bg-gray-100'>
        <div className='w-64 bg-white shadow'>
          {/* Sidebar */}
          <div className='border-b p-4'>
            <h1 className='text-xl font-semibold'>관리자 대시보드</h1>
          </div>
          {/* Nav */}
          <nav className='mt-4'>
            <ul>
              <li className='cursor-pointer px-4 py-2 text-gray-600 hover:bg-gray-200'>사용자 관리</li>
              <li className='cursor-pointer px-4 py-2 text-gray-600 hover:bg-gray-200'>신고자 관리</li>
              <li className='cursor-pointer px-4 py-2 text-gray-600 hover:bg-gray-200'>통계 분석</li>
              {/* Add more links as needed */}
            </ul>
          </nav>
          <div className='flex items-center gap-4'>
            <img
              className='h-10 w-10 rounded-full border-2 border-pink-500'
              src='https://i.namu.wiki/i/vDDaVK4wm1-vPZgAOI65rbhLhr1vPCzBgoRKSS7mEFx4IH2vtHvvMN41Umw-taptksIW_WqnjwOdcGbAMpAmrQ.webp'
              alt='Profile'
            />
            <button className='mr-4 rounded-md bg-gray-200 px-4 py-2 font-semibold text-gray-800 hover:bg-gray-300'>
              시스템 설정
            </button>
          </div>
        </div>

        {/* Main */}
        <main className='flex-1 p-4'>
          <div className='mx-auto mt-8 max-w-7xl px-4'>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2'>
              {/* Card 1 */}
              <div className='rounded-lg bg-white p-6 shadow-md'>
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
      </div>

      <div className='min-h-screen bg-gray-100'>
        <div className='flex items-center justify-between bg-white px-6 py-4 shadow-md'>
          <h1 className='text-2xl font-semibold text-gray-800'>Dashboard</h1>
        </div>
      </div>
    </>
  );
}
