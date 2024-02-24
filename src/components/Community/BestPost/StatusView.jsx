import { FcLike } from 'react-icons/fc';
import { MdOutlineRemoveRedEye } from 'react-icons/md';

export default function StatusView() {
  return (
    <div className='flex items-center font-semibold'>
      <div className='flex items-center gap-1'>
        <MdOutlineRemoveRedEye />
        <span className='pl-1'>1048</span>
        <FcLike className='opacity-50' />
        <span className='pl-1'>986</span>
      </div>
    </div>
  );
}
