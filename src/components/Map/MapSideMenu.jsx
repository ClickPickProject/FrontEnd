'use client';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';
import MapHeader from './MapHeader';
import Pagination from 'react-js-pagination';
import { useRecoilValue } from 'recoil';
import { mapMenuState } from '@/atoms/mapState';
import Link from 'next/link';

export default function MapSideMenu({
  markers,
  handleMarkerClick,
  handleSearch,
  handleInputChange,
  totalItemsCount,
  currentPage,
  postsPerPage,
  handlePageChange,
}) {
  const mapMenu = useRecoilValue(mapMenuState);

  return (
    <div className='flex h-screen w-[500px] flex-col'>
      <div className='flex flex-col items-center gap-4 bg-pink-200 p-2'>
        <Link href='/' className='mr-auto flex items-center'>
          <figure className='p-2'>
            <Image src='/Images/clickpick_icon.png' width={32} height={32} alt='logo' />
          </figure>
          <span className='text-xl font-bold'>ClickPick</span>
        </Link>
        {/* 검색창 */}
        <form onSubmit={handleSearch} className='relative flex h-[45px] w-full gap-4'>
          <input
            className='w-full rounded-md pl-2 outline-none'
            type='text'
            placeholder='장소, 주소, 검색'
            onChange={handleInputChange}
          />
          <div className='absolute bottom-0 right-2 top-0 flex items-center'>
            <button type='submit'>
              <FaSearch color='hotpink' size={20} />
            </button>
          </div>
        </form>
        <MapHeader />
      </div>

      {mapMenu === '지도 홈' && (
        <>
          <div className='flex flex-col items-center gap-4 p-2'>
            <div className='flex w-full items-center gap-4'>
              <span className='text-lg font-bold'>{mapMenu}</span>
            </div>
          </div>
          {/* 지도 검색 결과 */}
          <section className='overflow-y-auto'>
            <ul>
              {markers.length === 0 && null}
              <h2 className='text-lg font-semibold'>검색 결과 ({totalItemsCount}개)</h2>
              {markers.map((marker) => (
                <li key={marker.content.placeUrl}>
                  <div className={`flex h-[110px] w-full flex-col p-2 hover:bg-pink-100`}>
                    <span className='cursor-pointer text-lg font-bold' onClick={() => handleMarkerClick(marker)}>
                      {marker.content}
                    </span>
                    <span className='text-sm opacity-80'>{marker.placeCategory}</span>
                    <span className='text-sm opacity-80'>{marker.placeAddressName}</span>
                    <span className='text-xs opacity-60'>
                      {marker.placeCategory.length === 0 ? '카테고리 없음' : marker.placeCategory}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <div className='flex justify-center'>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={postsPerPage}
                totalItemsCount={totalItemsCount}
                onChange={handlePageChange}
                itemClass='px-3 py-1 rounded-md mr-2 cursor-pointer'
                activeClass='bg-pink-400 text-white'
                itemClassFirst='px-3 py-1 rounded-md mr-2 cursor-pointer'
                itemClassPrev='px-3 py-1 rounded-md mr-2 cursor-pointer'
                itemClassNext='px-3 py-1 rounded-md mr-2 cursor-pointer'
                itemClassLast='px-3 py-1 rounded-md mr-2 cursor-pointer'
                innerClass='flex'
              />
            </div>
          </section>
        </>
      )}

      {mapMenu === '즐겨찾기' && <>즐겨찾기</>}
      {mapMenu === '게시판' && <>게시판</>}
    </div>
  );
}
