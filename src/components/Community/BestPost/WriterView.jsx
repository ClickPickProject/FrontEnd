import Image from 'next/image';

export default function WriterView() {
  return (
    <span className='flex items-center text-sm font-bold'>
      <Image
        alt='#'
        src='/Images/barn.jpg'
        width={24}
        height={24}
        className='h-[24px] w-[24px] rounded-full border-2 border-gray-300 object-cover'
      />
      이름이 긴 닉네임입니다 · <span className='opacity-50'>3일 전</span>
    </span>
  );
}
