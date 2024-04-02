import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import Image from 'next/image';
export default function WriterView({ writer, date, profile }) {
  dayjs.extend(relativeTime);
  dayjs.locale('ko');
  console.log(profile);
  return (
    <span className='flex items-center gap-1 text-sm font-bold'>
      <Image
        alt='#'
        src={`${profile === undefined || profile.length === 0 ? '/Images/user.png' : profile}`}
        width={24}
        height={24}
        className='h-[24px] w-[24px] rounded-full border border-slate-200 object-cover shadow-sm'
      />
      {writer ? writer : 'Guest'}
      <span className='opacity-50'>{date ? ' · ' + dayjs(date).fromNow() : null}</span>
    </span>
  );
}
