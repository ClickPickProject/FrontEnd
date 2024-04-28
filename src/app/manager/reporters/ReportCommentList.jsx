import { useState } from 'react';
import dayjs from 'dayjs';
import Select from 'react-select';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/Loading';
import axios from 'axios';

export default function ReportCommentList() {
  const [selectedPeriod, setSelectedPeriod] = useState(null); // 선택된 기간 상태
  const { data, isPending, isError } = useQuery({
    queryKey: ['reportCommentUsers'],
    queryFn: async () => {
      const res = await axios.get('/api/admin/reportcommentlist');
      return res.data;
    },
  });

  if (isPending || isError) return <Loading isPending={isPending} isError={isError} />;

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
    { value: 3, label: '3일' },
    { value: 7, label: '7일' },
    { value: 30, label: '30일' },
    { value: 99999, label: '영구' },
  ];

  return (
    <div className='grid w-full grid-cols-8 items-center gap-2 bg-white py-2 text-center'>
      {data.content.map((user) => (
        <>
          <div className=''>{user.reportCommentId}</div>
          <div className=''>{user.reportUserId}</div>
          <div className=''>{user.reportedUserId}</div>
          <div className=''>{user.commentId}</div>
          <div className=''>{user.reason}</div>
          <div className=''>
            <Select
              defaultValue={selectedPeriod}
              onChange={setSelectedPeriod}
              options={options}
              placeholder='기간 선택'
              isSearchable={false}
            />
          </div>
          <div className=''>{user.reportStatus}</div>
          <div className={`flex justify-center gap-2`}>
            <button className='rounded-full bg-red-500 px-2 text-white transition-all hover:scale-105 hover:bg-red-600'>
              정지
            </button>
            <button className='rounded-full bg-blue-500 px-2 text-white transition-all hover:scale-105 hover:bg-blue-600'>
              해제
            </button>
            <button className='rounded-full bg-purple-500 px-2 text-white transition-all hover:scale-105 hover:bg-purple-600'>
              연장
            </button>
          </div>
        </>
      ))}
    </div>
  );
}
