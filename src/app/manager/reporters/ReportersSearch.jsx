import { FaSearch } from 'react-icons/fa';

export default function ReportersSearch() {
  return (
    <div className='mb-4 flex w-full'>
      {/* 검색어 입력 */}
      <form className='relative w-full'>
        <input
          type='text'
          placeholder='일치하는 사용자를 검색하세요.'
          className='w-full rounded-lg border-2 border-pink-300 px-3 py-2 outline-none'
        />
        <button className='absolute right-0 mr-4 h-full items-center'>
          <FaSearch size={24} color='hotpink' />
        </button>
      </form>
    </div>
  );
}
