import { useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Select from 'react-select';
import Loading from '@/components/Loading';
import { axiosInstance } from '@/components/utils/Axios';
import { tokenState } from '@/atoms/tokenState';
import { useRecoilValue } from 'recoil';

export default function ReportCommentList() {
  const [selectedPeriod, setSelectedPeriod] = useState(null); // 선택된 기간
  const selectInputRef = useRef(null);
  const queryClient = useQueryClient();
  const token = useRecoilValue(tokenState);
  const onClearSelect = (idx) => {
    selectInputRef[idx].clearValue();
  };
  const { data, isPending, isError } = useQuery({
    queryKey: ['reportCommentUsers'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/admin/reportcommentlist', { headers: { Authorization: token } });
      return res.data;
    },
  });

  if (isPending || isError) return <Loading isPending={isPending} isError={isError} />;

  const onClickAccept = async (reportCommentId, reportedUserId, reason, banDays) => {
    const body = {
      reportId: reportCommentId,
      reportedUserId,
      reason,
      banDays: selectedPeriod?.value,
    };
    try {
      const res = await axiosInstance.post('/api/admin/commentban', body, {
        headers: {
          Authorization: token,
        },
      });
      if (banDays === null) {
        toast.error('기간을 선택해주세요.');
        return;
      }

      if (res.status === 200) {
        toast.success(`정지되었습니다. (${banDays?.value === -1 ? '영구' : banDays?.value + '일'})`);
        queryClient.invalidateQueries('reportCommentUsers');
        setSelectedPeriod(null);
      }
    } catch (err) {
      toast.error('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const onClickDelete = async (reportCommentId) => {
    try {
      const body = {
        id: reportCommentId,
        type: 'comment',
      };
      const res = await axiosInstance.post(`/api/admin/withdrawal`, body, {
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200) {
        queryClient.invalidateQueries(['banndUsers']);
        toast.success(`신고가 철회되었습니다.`);
      }
    } catch (error) {
      toast.error('처리 중 오류가 발생했습니다.');
    }
  };
  const options = [
    { value: 3, label: '3일' },
    { value: 7, label: '7일' },
    { value: 30, label: '30일' },
    { value: -1, label: '영구' },
  ];

  return (
    <>
      {data.content.map((user, index) => (
        <div
          className='grid w-full grid-cols-8 items-center gap-2 bg-white py-2 text-center'
          key={user.reportCommentId}
        >
          <div className=''>{user.reportCommentId}</div>
          <div className=''>{user.reportUserId}</div>
          <div className=''>{user.reportedUserId}</div>
          <div className=''>{user.commentId}</div>
          <div className=''>{user.reason}</div>
          <div className=''>
            <Select
              ref={(ref) => (selectInputRef[index] = ref)}
              defaultValue={selectedPeriod}
              onChange={setSelectedPeriod}
              options={options}
              placeholder='기간 선택'
              isSearchable={false}
            />
          </div>
          <div className=''>{user.reportStatus}</div>
          <div className={`flex justify-center gap-2`}>
            <button
              onClick={() => {
                onClickAccept(user.reportCommentId, user.reportedUserId, user.reason, selectedPeriod);
                onClearSelect(index);
              }}
              className='rounded-full bg-red-500 px-2 text-white transition-all hover:scale-105 hover:bg-red-600'
            >
              정지
            </button>
            <button
              onClick={() => onClickDelete(user.reportCommentId)}
              className='rounded-full bg-blue-500 px-2 text-white transition-all hover:scale-105 hover:bg-blue-600'
            >
              철회
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
