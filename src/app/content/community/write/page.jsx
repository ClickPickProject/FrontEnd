'use client';
import SideNavbar from '@/components/Community/SideNavbar';
import dynamic from 'next/dynamic';

export default function WritePage() {
  const CustomEditor = dynamic(
    () => {
      return import('@/components/CustomEditor');
    },
    { ssr: false, loading: () => '로딩중입니다...' },
  );
  const handleWriteSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };
  return (
    <>
      <SideNavbar />
      <div>
        <div className='p-4 text-2xl font-bold'>글 작성</div>
        <form onSubmit={handleWriteSubmit} className='flex flex-col'>
          <input placeholder='제목을 입력해주세요' className='h-12 pl-2 text-2xl outline-none' />
          <select className='bg-gray-200 p-4 text-2xl font-bold'>
            <option value='' defaultValue='0'>
              카테고리 선택
            </option>
            <option value=''>1</option>
            <option value=''>2</option>
            <option value=''>3</option>
          </select>
          <div className='h-[full] w-[full]'>
            <CustomEditor initialData='' />
          </div>
          <div className='mx-auto mt-4 flex h-10 w-1/6 cursor-pointer items-center justify-center rounded-lg bg-pink-300 font-semibold shadow-md transition-all hover:bg-pink-400 '>
            <button type='submit' className=''>
              제출
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
