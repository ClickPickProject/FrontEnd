'use client';
// import dynamic from 'next/dynamic';
import ReporterList from './ReporterList';
import ReportersSearch from './ReportersSearch';
import { useState } from 'react';
import Select from 'react-select';
export default function page() {
  // const ReporterCharts = dynamic(() => import('./ReporterCharts'), { ssr: false });
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 콤보박스를 열고 닫는 상태

  const handleTypeClick = (e) => {
    setIsDropdownOpen(!isDropdownOpen); // 클릭할 때마다 콤보박스 상태 변경
  };

  const handleTypeSelect = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <>
      <div className='flex h-full w-full flex-col px-8'>
        <div className='flex flex-col gap-2 p-2'>
          <h2 className='text-2xl font-bold'>🚨 신고자 관리</h2>
          <p className='mb-4 text-sm opacity-50'>들어온 신고를 처리하는 곳입니다.</p>
        </div>
        {/* <div className='mb-8'>
          <ReporterCharts />
        </div> */}
        {/* <ReportersSearch /> */}
        <div className='flex cursor-pointer gap-4 py-4 text-sm'>
          <Select
            options={[
              { value: '게시글', label: '게시글' },
              { value: '댓글', label: '댓글' },
            ]}
            className='w-48 '
            placeholder='신고 유형'
            isSearchable={false}
          />
          {/* <button
            className={`font-bold ${1 === '게시글' ? 'text-blue-500' : 'text-gray-500'} rounded-lg bg-pink-100 px-4 py-2 transition-all hover:text-pink-500`}
            onClick={() => handleTabClick('게시글')}
          >
            게시글 신고 현황
          </button>
          <button
            className={`font-bold ${1 === '댓글' ? 'text-blue-500' : 'text-gray-500'} rounded-lg bg-pink-100 px-4 py-2 transition-all hover:text-pink-500`}
            onClick={() => handleTabClick('댓글')}
          >
            댓글 신고 현황
          </button> */}
        </div>
        <div className='mx-auto flex w-full flex-col'>
          <div className='h-screen overflow-hidden rounded-sm border-b border-gray-200 shadow'>
            <div className='bg-pink-300 text-black'>
              <div className='grid grid-cols-6 gap-2 py-2 text-center text-sm [&>*]:font-semibold'>
                <div className=''>신고 유형</div>
                <div className=''>신고자 닉네임</div>
                <div className=''>피신고자 닉네임</div>
                <div className=''>신고사유</div>
                <div className=''>정지 기간</div>
                <div className=''>처리</div>
              </div>
            </div>
            <div className='flex flex-col items-center divide-y divide-pink-100 bg-gray-100 text-sm'>
              <ReporterList />
              <ReporterList />
              <ReporterList />
              <ReporterList />
              <ReporterList />
              <ReporterList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
