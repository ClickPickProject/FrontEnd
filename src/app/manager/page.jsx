'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

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
  const ReporterCharts = dynamic(() => import('./reporters/ReporterCharts'), { ssr: false });
  const TreemapCharts = dynamic(() => import('./reporters/TreemapCharts'), { ssr: false });
  const PieCharts = dynamic(() => import('./reporters/PieCharts'), { ssr: false });
  return (
    <>
      {/* Main */}
      <main className='flex-1 p-4'>
        <div className='mx-auto mt-8 max-w-7xl px-4'>
          <div className='grid grid-cols-3 gap-6 lg:grid-cols-3 md:grid-cols-2'>
            {/* Card 1 */}
            <div className='rounded-xl bg-pink-50 p-6 shadow-md'>
              <ReporterCharts title='월별 가입자 추이' />
              <h2 className='mb-2 text-xl font-semibold text-gray-800'>월별 가입자</h2>
              <p className='text-gray-600'>월별 가입자 통계</p>
            </div>
            {/* Card 2 */}

            <div className='rounded-lg bg-indigo-50 p-6 shadow-md'>
              <ReporterCharts title='1월' year='1' />
              <h2 className='mb-2 text-xl font-semibold text-gray-800'>메세지</h2>
              <p className='text-gray-600'>
                국회는 법률에 저촉되지 아니하는 범위안에서 의사와 내부규율에 관한 규칙을 제정할 수 있다.
              </p>
            </div>
            {/* Card 3 */}
            <div className='flex items-center rounded-lg bg-yellow-50 p-6 shadow-md'>
              <PieCharts />
            </div>
          </div>
          <TreemapCharts />
        </div>
      </main>
    </>
  );
}
