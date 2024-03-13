import { MdReportGmailerrorred } from 'react-icons/md';
import WriterView from './BestPost/WriterView';

export default function Comment({ comments }) {
  if (!comments || comments.length === 0) {
    return null;
  }
  return (
    <div className=''>
      <ul>
        {comments.map((comment) => (
          <li className='flex flex-col gap-3'>
            <WriterView writer={comment.nickname} date={comment.createAt} />
            <div>{comment.content}</div>
            <div className='flex items-center gap-1'>
              <MdReportGmailerrorred color='red' opacity='70%' />
              <div className='text-sm font-semibold opacity-50'>신고</div>
            </div>
            <div className='my-4 border' />
          </li>
        ))}
      </ul>
    </div>
  );
}
