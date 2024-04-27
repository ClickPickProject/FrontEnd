import { useState } from 'react';
import dayjs from 'dayjs';
import Select from 'react-select';

export default function ReporterList() {
  const [selectedPeriod, setSelectedPeriod] = useState(null); // 선택된 기간 상태

  const onClickAccept = () => {
    const currentDate = dayjs();
    const format = 'YYYY-MM-DDTHH:mm:ss';
    console.log('승인');
    switch (selectedPeriod) {
      case '3일':
        console.log(currentDate.add(3, 'd').format(format));
        break;
      case '5일':
        console.log(currentDate.add(5, 'd').format(format));
        break;
      case '7일':
        console.log(currentDate.add(7, 'd').format(format));
        break;
      case '30일':
        console.log(currentDate.add(30, 'd').format(format));
        break;
      case '영구':
        console.log(currentDate.add(999, 'y').format(format));
        break;
      default:
        console.log('기간을 선택해주세요');
    }
  };

  const onClickReject = () => {
    console.log('거부');
  };

  const options = [
    { value: '3', label: '3일' },
    { value: '7', label: '7일' },
    { value: '30', label: '30일' },
    { value: '99999', label: '영구' },
  ];

  return (
    <div className='grid  w-full grid-cols-6 items-center gap-2 bg-white py-2 text-center'>
      <div className=''>댓글</div>
      <div className=''>경찰</div>
      <div className=''>악질 유저2</div>
      <div className=''>도배</div>
      <div className=''>
        <div className='relative'>
          <div className='cursor-pointer'>
            <Select
              defaultValue={selectedPeriod}
              onChange={setSelectedPeriod}
              options={options}
              placeholder='기간 선택'
              className='border-pink-200 px-2'
              autoFocus
              isSearchable={false}
            />
          </div>
        </div>
      </div>
      <div className='mx-auto flex items-center gap-2 text-lg'>
        <button className='rounded bg-blue-500 px-2 font-semibold text-white hover:bg-blue-700' onClick={onClickAccept}>
          승인
        </button>
        <button className='rounded bg-red-500 px-2 font-semibold text-white hover:bg-red-700' onClick={onClickReject}>
          거부
        </button>
      </div>
    </div>
  );
}
