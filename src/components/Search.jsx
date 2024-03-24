import { FaSearch } from 'react-icons/fa';

export default function Search({ searchOption, setSearchOption, search, setSearch, onClickSearch }) {
  return (
    <div className='mb-4 flex w-1/2'>
      {/* 검색 옵션 */}
      <select
        value={searchOption}
        onChange={(e) => setSearchOption(e.target.value)}
        className='mr-2 rounded-lg border-2 border-pink-300 px-3 py-2 outline-none'
      >
        <option value='title'>제목</option>
        <option value='content'>내용</option>
        <option value='hashtag'>해시태그</option>
      </select>

      {/* 검색어 입력 */}
      <form className='relative w-full' onSubmit={onClickSearch}>
        <input
          type='text'
          placeholder='검색어를 입력하세요.'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-full rounded-lg border-2 border-pink-300 px-3 py-2 outline-none'
        />
        <button className='absolute right-0 mr-4 h-full items-center'>
          <FaSearch size={24} color='hotpink' />
        </button>
      </form>
    </div>
  );
}
