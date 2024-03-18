import WriterView from './BestPost/WriterView';

export default function Comment() {
  return (
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
  );
}
