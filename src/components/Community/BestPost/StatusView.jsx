import { EyeIcon, LikeIcon } from '@/components/UI/Icons';

export default function StatusView() {
  return (
    <div className='flex items-center font-semibold'>
      <div className='flex items-center gap-1'>
        <EyeIcon />
        <span className='pl-1'>1048</span>
        <LikeIcon />
        <span className='pl-1'>986</span>
      </div>
    </div>
  );
}
