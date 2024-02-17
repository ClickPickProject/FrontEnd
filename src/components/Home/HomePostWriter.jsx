import { FaRegCommentDots } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';

export default function HomePostWriter() {
  return (
    <>
      <div className='flex'>
        <span className='font-bold'>
          hibye · <span className='text-sm font-normal text-gray-500'>10분 전</span>
        </span>
        <div className='ml-auto flex gap-2'>
          <span className='flex gap-1'>
            <FcLike size={24} className='opacity-50' /> 2
          </span>
          <span className='flex gap-1'>
            <FaRegCommentDots size={24} className='opacity-50' /> 3
          </span>
        </div>
      </div>
    </>
  );
}
