'use client';
import { useParams } from 'next/navigation';
import { tokenState } from '@/atoms/tokenState';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/Loading';
import WriterView from '@/components/Community/BestPost/WriterView';
import { axiosInstance } from '@/components/utils/Axios';

export default function PostDetail() {
  const params = useParams();
  const token = useRecoilValue(tokenState);
  const {
    data: userPost,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['noticePost', params.id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/notice/${params.id}`);

      if (res.status !== 200) {
        throw new Error('Failed to fetch data');
      }

      return res.data;
    },
  });

  if (isPending) return <Loading isPending={isPending} />;
  if (isError) return <div>불러오는 중 에러가 발생하였습니다.</div>;

  const { title, noticeId, nickname, date, content, profileUrl } = userPost;

  return (
    <>
      <div className='mt-8 w-full max-w-[830px]'>
        <div className='my-4 flex flex-col gap-4'>
          <h2 className='text-2xl font-semibold'>{title}</h2>
          {/* 작성자 */}
          <div className='mb-4 flex justify-between'>
            <WriterView writer={'관리자'} date={date} profile={'/Images/admin.jpg'} />
          </div>
        </div>
        {/* 내용 */}
        <div className='mb-4 min-h-[250px]'>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        {/* 경계선 */}
        <div className='my-4 border-b-2' />
      </div>
    </>
  );
}
