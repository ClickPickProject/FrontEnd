import StatusView from './BestPost/StatusView';
import WriterView from './BestPost/WriterView';
import { IoMdHeartEmpty } from 'react-icons/io';
import { FaRegCommentDots } from 'react-icons/fa6';

export default function PostDetail() {
  return (
    <>
      <div className='w-full'>
        <div className='my-8 flex flex-col gap-4'>
          <h2 className='text-2xl font-semibold'>오늘 별마당 도서관에서 이벤트 하나봐요</h2>
          {/* 작성자 */}
          <div className='flex justify-between'>
            <WriterView />
            <StatusView />
          </div>
        </div>
        {/* 내용 */}
        <div className='p-4'>
          모든 국민은 자기의 행위가 아닌 친족의 행위로 인하여 불이익한 처우를 받지 아니한다. <br />
          정부는 예산에 변경을 가할 필요가 있을 때에는 추가경정예산안을 편성하여 국회에 제출할 수 있다. <br />
          법률이 헌법에 위반되는 여부가 재판의 전제가 된 경우에는 법원은 헌법재판소에 제청하여 그 심판에 의하여
          재판한다.
          <br /> 지방자치단체는 주민의 복리에 관한 사무를 처리하고 재산을 관리하며, 법령의 범위안에서 자치에 관한 규정을
          제정할 수 있다.
          <br /> 이 헌법공포 당시의 국회의원의 임기는 제1항에 의한 국회의 최초의 집회일 전일까지로 한다.
        </div>
        <div className='flex items-center gap-1'>
          <IoMdHeartEmpty size={18} color='red' />
          좋아요 2
          <FaRegCommentDots size={18} />
          댓글 2
        </div>
        {/* 경계선 */}
        <div className='mb-8 mt-4 border-b-2' />
        <div className=''>
          <ul>
            <li className='flex flex-col gap-1'>
              <WriterView />
              <div>그렇군요...</div>
              <div className='text-sm font-semibold opacity-50'>답글</div>
              <div className='border' />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
