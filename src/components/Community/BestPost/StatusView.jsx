import { EyeIcon, LikeIcon } from '@/components/UI/Icons';

export default function StatusView({ viewCount, likeCount }) {
  return (
    <div className='flex items-center font-semibold'>
      <div className='flex items-center gap-1'>
        {viewCount ? (
          <>
            <EyeIcon />
            <span className='pl-1'>{viewCount}</span>
          </>
        ) : null}
        {likeCount ? (
          <>
            <LikeIcon />
            <span className='pl-1'>{likeCount}</span>
          </>
        ) : null}
      </div>
    </div>
  );
}
