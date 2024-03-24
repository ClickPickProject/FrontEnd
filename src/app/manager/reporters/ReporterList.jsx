import { useState } from 'react';

export default function ReporterList() {
  const [selectedPeriod, setSelectedPeriod] = useState(null); // 선택된 기간 상태
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null); // 열린 드롭다운의 인덱스

  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period);
    setOpenDropdownIndex(null); // 드롭다운 선택 후 열린 드롭다운 인덱스 초기화
  };

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index); // 클릭한 드롭다운이 이미 열려있으면 닫고, 아니면 열기
  };

  return (
    <div className='grid w-full grid-cols-6 gap-2 bg-white py-2 text-center'>
      <div className=''>댓글</div>
      <div className=''>경찰</div>
      <div className=''>악질 유저2</div>
      <div className=''>도배</div>
      <div className=''>
        {/* 드롭다운으로 표시된 기간 */}
        <div className='relative'>
          <div className='cursor-pointer' onClick={() => toggleDropdown(0)}>
            {selectedPeriod ? selectedPeriod : '기간 선택'}
            <span className='ml-1'>{openDropdownIndex === 0 ? '▲' : '▼'}</span>
          </div>
          {openDropdownIndex === 0 && (
            <div className='absolute right-0 z-10 w-full rounded-md bg-white shadow-lg'>
              <span className='block cursor-pointer px-4 py-2' onClick={() => handlePeriodSelect('3일')}>
                3일
              </span>
              <span className='block cursor-pointer px-4 py-2' onClick={() => handlePeriodSelect('5일')}>
                5일
              </span>
              <span className='block cursor-pointer px-4 py-2' onClick={() => handlePeriodSelect('영구')}>
                영구
              </span>
            </div>
          )}
        </div>
      </div>
      <div className='mx-auto flex items-center gap-2'>
        <button className='rounded bg-blue-500 px-2 font-bold text-white hover:bg-blue-700'>승인</button>
        <button className='rounded bg-red-500 px-2 font-bold text-white hover:bg-red-700'>거부</button>
      </div>
    </div>
  );
}
