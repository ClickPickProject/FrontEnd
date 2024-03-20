import { FaSearch } from 'react-icons/fa';

export default function ReportersSearch() {
  return (
    <div className='mb-4 ml-4 flex w-1/3'>
      {/* 검색어 입력 */}
      <form className='relative w-full'>
        <input
          type='text'
          placeholder='닉네임을 입력하세요.'
          className='w-full rounded-lg border-2 border-pink-300 px-3 py-2 outline-none'
        />
        <button className='absolute right-0 mr-4 h-full items-center'>
          <FaSearch size={24} color='hotpink' />
        </button>
      </form>
    </div>
  );
}
