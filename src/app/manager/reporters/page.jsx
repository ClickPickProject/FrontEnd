'use client';
// import ReporterCharts from './ReporterCharts';
import ReporterList from './ReporterList';
import ReportersSearch from './ReportersSearch';
import { useEffect, useState } from 'react';

export default function page() {
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
      <div className='flex w-full flex-col px-8'>
        <div className='flex flex-col gap-2 p-2'>
          <h2 className='text-2xl font-bold'>🚨 신고자 관리</h2>
          <p className='mb-4 text-sm opacity-50'>들어온 신고를 처리하는 곳입니다.</p>
        </div>
        <div className='mb-8'>{/* <ReporterCharts /> */}</div>
        <ReportersSearch />
        <div className='mx-auto flex w-full flex-col'>
          <div className='overflow-hidden rounded-md border-b border-gray-200 shadow'>
            <div className='bg-pink-300 text-black'>
              <div className='grid grid-cols-6 gap-2 py-2 text-center text-sm [&>*]:font-semibold'>
                {/* <div className=''>신고 유형</div> */}
                {/* 클릭 시 콤보박스 열기/닫기 */}
                <div className='' onClick={handleTypeClick}>
                  신고 유형
                  {isDropdownOpen ? '▲' : '▼'}
                  {/* 콤보박스 */}
                  {isDropdownOpen && (
                    <div className='absolute z-10 rounded-md bg-white shadow-lg'>
                      <span className='block cursor-pointer px-4 py-2' onClick={() => handleTypeSelect('게시글')}>
                        게시글
                      </span>
                      <span className='block cursor-pointer px-4 py-2' onClick={() => handleTypeSelect('댓글')}>
                        댓글
                      </span>
                      {/* 다른 유형에 대한 항목도 추가할 수 있음 */}
                    </div>
                  )}
                </div>
                <div className=''>신고자 닉네임</div>
                <div className=''>피신고자 닉네임</div>
                <div className=''>신고사유</div>
                <div className=''>정지 기간</div>
                <div className=''>처리</div>
              </div>
            </div>
            <div className='flex flex-col items-center divide-y divide-pink-100 bg-gray-100 text-sm '>
              <div className='grid w-full grid-cols-6 gap-2 py-2 text-center'>
                <div className=''>게시글</div>
                <div className=''>경찰</div>
                <div className=''>악질 유저1</div>
                <div className=''>부적절한 행동</div>
                <div className=''>기간 선택</div>
                <div className='mx-auto flex items-center gap-2'>
                  <button className='rounded bg-blue-500 px-2 font-bold text-white hover:bg-blue-700'>승인</button>
                  <button className='rounded bg-red-500 px-2 font-bold text-white hover:bg-red-700'>거부</button>
                </div>
              </div>
              <ReporterList />
              <ReporterList />
              <ReporterList />
              <ReporterList />
              <ReporterList />
              <ReporterList />
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
