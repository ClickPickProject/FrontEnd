import WriterView from './BestPost/WriterView';
import { ReplyIcon } from '../UI/Icons';

export default function ReplyComments({ reply }) {
  return (
    <>
      <div className='flex flex-col gap-2'>
        <WriterView writer={reply.nickname} date={reply.createAt} />
        <div>{reply.content}</div>
        <div className='flex items-center gap-1'>
          <ReplyIcon color='red' opacity='70%' />
          <div className='text-sm font-semibold opacity-50'>신고</div>
          {reply.nickname === '올빼미' ? <div className='text-sm font-semibold opacity-50'>삭제</div> : null}
        </div>
        <div className='my-2 border' />
      </div>
    </>
  );
}
