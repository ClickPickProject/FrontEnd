'use client';
import { useState } from 'react';
import { FillSirenIcon } from '../UI/Icons';
import { reportModalState } from '@/atoms/commentState';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import axios from 'axios';
import { tokenState } from '@/atoms/tokenState';

const ReportModal = ({ nickname, commentId }) => {
  const [reportReason, setReportReason] = useState('');
  const setReportModal = useSetRecoilState(reportModalState);
  const token = useRecoilValue(tokenState);

  const closeReportModal = () => setReportModal(false);

  const handleSubmit = async (nickname, commentId, reason) => {
    console.log('Reported User:', nickname);
    console.log('Report Reason:', reason);
    try {
      const body = {
        reportedUserNickname: nickname,
        commentId: commentId,
        reason,
      };
      const res = await axios.post('/api/member/report/comment', body, {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200) {
        console.log('신고 접수 완료', nickname, commentId, reason);
      }
    } catch (err) {
      console.log(err);
    }
    closeReportModal();
  };

  return (
    <>
      <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
        <div className='absolute inset-0 bg-gray-500 opacity-10'></div>
      </div>

      {/* 모달 콘텐츠 */}
      <div className='inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle'>
        <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
          <div className='sm:flex sm:items-start'>
            <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
              <h3 className='flex items-center justify-center gap-2 pb-4 text-lg font-medium leading-6 text-gray-900'>
                <FillSirenIcon color='red' />
                사용자 신고
              </h3>
              <div className='mt-2'>
                {/* 유저명 입력 폼 */}
                <input
                  type='text'
                  placeholder={nickname}
                  disabled
                  className='mb-4 w-full rounded border border-gray-300 p-2'
                />
                {/* 신고 사유 입력 폼 */}
                <textarea
                  placeholder='신고 사유를 적어주세요.'
                  className='mb-4 w-full rounded border border-gray-300 p-2'
                  rows='4'
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 '>
          {/* 제출 버튼 */}
          <button
            onClick={() => handleSubmit(nickname, commentId, reportReason)}
            className='inline-flex w-full justify-center rounded-md border border-transparent bg-pink-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
          >
            신고
          </button>
          {/* 취소 버튼 */}
          <button
            onClick={closeReportModal}
            className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm'
          >
            취소
          </button>
        </div>
      </div>
    </>
  );
};

export default ReportModal;
