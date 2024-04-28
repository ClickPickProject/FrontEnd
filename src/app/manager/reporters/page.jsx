'use client';
import { motion } from 'framer-motion';
// import dynamic from 'next/dynamic';
import Select from 'react-select';
import { useRecoilState } from 'recoil';
import { filterReportStatusState } from '@/atoms/managerState';
import { useEffect } from 'react';
import ReportCommentList from './ReportCommentList';
import ReportPostList from './ReporterPostList';
export default function ReportersPage() {
  const [filterReportStatus, setFilterReportStatus] = useRecoilState(filterReportStatusState);
  useEffect(() => {
    setFilterReportStatus({
      value: 'posts',
      label: '게시글',
    });
  }, []);

  // const ReporterCharts = dynamic(() => import('./ReporterCharts'), { ssr: false });
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
        <div className='flex cursor-pointer gap-4 py-4 text-sm'>
          <Select
            options={[
              { value: 'posts', label: '게시글' },
              { value: 'comments', label: '댓글' },
            ]}
            className='w-48'
            placeholder='신고 유형'
            defaultValue={filterReportStatus}
            onChange={setFilterReportStatus}
            isSearchable={false}
          />
        </div>

        {filterReportStatus.value === 'posts' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, delay: 0.5 }}
            className='mx-auto flex w-full flex-col'
          >
            <div className='h-screen overflow-auto rounded-sm border-b border-gray-200 shadow'>
              <div className='bg-pink-300 text-black'>
                <div className='grid grid-cols-8 gap-2 py-2 text-center text-sm [&>*]:font-semibold'>
                  <div className=''>#</div>
                  <div className=''>게시글 ID</div>
                  <div className=''>신고자 ID</div>
                  <div className=''>피신고자 ID</div>
                  <div className=''>사유</div>
                  <div className=''>정지 기간</div>
                  <div className=''>상태</div>
                  <div className=''>처리</div>
                </div>
              </div>
              <div className='flex flex-col items-center divide-y divide-pink-100 bg-gray-100 text-sm'>
                <ReportPostList />
              </div>
            </div>
          </motion.div>
        )}
        {filterReportStatus.value === 'comments' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, delay: 0.5 }}
            className='mx-auto flex w-full flex-col'
          >
            <div className='h-screen overflow-auto rounded-sm border-b border-gray-200 shadow'>
              <div className='bg-pink-300 text-black'>
                <div className='grid grid-cols-8 gap-2 py-2 text-center text-sm [&>*]:font-semibold'>
                  <div className=''>#</div>
                  <div className=''>게시글 ID</div>
                  <div className=''>신고자 ID</div>
                  <div className=''>피신고자 ID</div>
                  <div className=''>사유</div>
                  <div className=''>정지 기간</div>
                  <div className=''>상태</div>
                  <div className=''>처리</div>
                </div>
              </div>
              <div className='flex flex-col items-center divide-y divide-pink-100 bg-gray-100 text-sm'>
                <ReportCommentList />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}
