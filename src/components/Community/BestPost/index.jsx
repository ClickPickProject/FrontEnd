import Image from 'next/image';
import { FaMedal } from 'react-icons/fa';
import StatusView from './StatusView';
import WriterView from './WriterView';

export default function BestPost() {
  return (
    <div className='flex flex-col'>
      <figure className='relative'>
        <FaMedal size={32} color='#FACC14' className='absolute' />
        <Image alt='#' src='/sakura.jpg' width={250} height={150} className='h-[150px] w-[250px] rounded-lg' />
      </figure>
      <h2 className='text-sm font-bold'>신전 앞에 봄바람과 춤추는 꽃잎... [129]</h2>
      <WriterView />
      <StatusView />
    </div>
  );
}
