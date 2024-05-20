'use client';
import { useState } from 'react';
import { banPeriodModalState } from '@/atoms/commentState';
import { useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import { FillSirenIcon } from '@/components/UI/Icons';
import { useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/components/utils/Axios';
import Select from 'react-select';

const BannedUserModal = ({ userId }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const queryClient = useQueryClient();
  const setBanPeriodModal = useSetRecoilState(banPeriodModalState);

  const closeReportModal = () => setBanPeriodModal(false);

  const handleSubmit = async (userId, days) => {
    try {
      const body = {
        userId,
        days,
      };
      const res = await axiosInstance.post(`/api/admin/ban/period`, body);
      if (res.status === 200) {
        queryClient.invalidateQueries(['banndUsers']);
        toast.success(`${userId} 기간이 연장되었습니다.`);
      }
    } catch (error) {
      toast.error('처리 중 오류가 발생했습니다.');
    }
    closeReportModal();
  };
  const options = [
    { value: 3, label: '3일' },
    { value: 7, label: '7일' },
    { value: 30, label: '30일' },
  ];
  return (
    <>
      <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
        <div className='absolute inset-0 bg-gray-500 opacity-10'></div>
      </div>

      {/* 모달 콘텐츠 */}
      <div className='inline-block w-72 transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle'>
        <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
          <div className='sm:flex sm:items-start'>
            <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
              <h3 className='flex items-center justify-center gap-2 pb-4 text-lg font-medium leading-6 text-gray-900'>
                <FillSirenIcon color='red' />
                정지 기간 연장
              </h3>
              <div className='mt-2'>
                {/* 유저명 입력 폼 */}
                <input
                  type='text'
                  placeholder={userId}
                  disabled
                  className='mb-4 w-full rounded border border-gray-300 p-2'
                />
                <Select
                  defaultValue={selectedPeriod}
                  onChange={setSelectedPeriod}
                  options={options}
                  placeholder='기간 선택'
                  isSearchable={false}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 '>
          {/* 변경 버튼 */}
          <button
            onClick={() => handleSubmit(userId, selectedPeriod?.value)}
            className='w-full justify-center rounded-md border border-transparent bg-pink-400 px-4 py-2 text-base font-medium text-white shadow-sm transition-all hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
          >
            변경
          </button>
          {/* 취소 버튼 */}
          <button
            onClick={closeReportModal}
            className='mt-3 w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm'
          >
            취소
          </button>
        </div>
      </div>
    </>
  );
};

export default BannedUserModal;
