import Image from 'next/image';
import StatusView from './StatusView';
import WriterView from './WriterView';

export default function BestPost() {
  return (
    <div className='relative flex flex-col overflow-hidden rounded-lg'>
      <div className='absolute left-2 top-1 z-10 flex h-[30px] w-[150px] -translate-x-[50px] translate-y-[15px] -rotate-45 transform items-center justify-center bg-pink-400 p-2 text-xl font-bold'>
        BEST
      </div>
      <figure className='relative mb-2'>
        <Image
          alt='#'
          src='/sakura.jpg'
          width={250}
          height={150}
          className='h-[150px] w-[250px] rounded-lg object-cover'
        />
      </figure>
      <div className='flex h-full w-full flex-col gap-2'>
        <div className='flex w-[250px] items-center'>
          <h2 className='overflow-hidden text-ellipsis whitespace-nowrap text-base font-bold'>
            신전 앞에 봄바람과 춤추는 꽃잎입니다...
          </h2>
          <span className='text-center text-sm font-semibold'>[224]</span>
        </div>
        <WriterView />
        <StatusView />
      </div>
    </div>
  );
}
