import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import Image from 'next/image';
export default function WriterView({ writer, date }) {
  dayjs.extend(relativeTime);
  dayjs.locale('ko');
  return (
    <span className='flex items-center gap-1 text-sm font-bold'>
      <Image
        alt='#'
        src='/Images/barn.jpg'
        width={24}
        height={24}
        className='h-[24px] w-[24px] rounded-full border-2 border-gray-300 object-cover'
      />
      {writer}
      <span className='opacity-50'>{date ? ' · ' + dayjs(date).fromNow() : null}</span>
    </span>
  );
}
