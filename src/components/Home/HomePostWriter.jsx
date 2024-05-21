import { FaRegCommentDots } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import { EyeIcon } from '@/components/UI/Icons';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import Image from 'next/image';

export default function HomePostWriter({ writer, date, profile, viewCount, likeCount }) {
  dayjs.extend(relativeTime);
  dayjs.locale('ko');
  return (
    <>
      <div className='flex gap-2'>
        <Image
          alt='#'
          src={`${profile === undefined || profile.length === 0 ? '/Images/user.png' : profile}`}
          width={24}
          height={24}
          className='h-[24px] w-[24px] rounded-full border border-slate-200 object-cover shadow-sm'
        />
        <span className='font-bold'>
          {writer} ·{' '}
          <span className='text-sm font-normal text-gray-500'>{date ? ' · ' + dayjs(date).fromNow() : null}</span>
        </span>
        <div className='ml-auto flex gap-2'>
          <span className='flex gap-1'>
            <FcLike size={24} className='opacity-50' /> {likeCount}
          </span>
          <span className='flex gap-1'>
            <EyeIcon size={24} className='opacity-50' /> {viewCount}
          </span>
        </div>
      </div>
    </>
  );
}
