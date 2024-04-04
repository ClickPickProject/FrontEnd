'use client';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';
import MapHeader from './MapHeader';
import Pagination from 'react-js-pagination';
import { useRecoilValue } from 'recoil';
import { mapMenuState, placeDetailState, placeListState } from '@/atoms/mapState';
import Link from 'next/link';
import { motion } from 'framer-motion';
import WriterView from '../Community/BestPost/WriterView';
import StatusView from '../Community/BestPost/StatusView';
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
  const placeDetail = useRecoilValue(placeDetailState);
  const placeList = useRecoilValue(placeListState);

  return (
    <motion.div
      className='absolute left-0 z-50 flex h-screen w-[400px] flex-col bg-white shadow-lg'
      initial={{ opacity: 0, x: '-100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 1, x: '-100%' }}
      transition={{ duration: 0.3 }}
    >
      <div className='flex flex-col items-center gap-4 bg-pink-200 px-4 py-2'>
        <Link href='/' className='mr-auto flex items-center'>
          <figure className='p-2'>
            <Image src='/Images/clickpick_icon.png' width={32} height={32} alt='logo' />
          </figure>
          <span className='text-2xl font-bold'>ClickPick</span>
        </Link>
        {/* 검색창 */}
        <form onSubmit={handleSearch} className='relative flex h-[42px] w-full'>
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
                  <div className={`flex h-[110px] w-full flex-col p-2 transition-all hover:bg-pink-100`}>
                    <span className='cursor-pointer text-lg font-bold' onClick={() => handleMarkerClick(marker)}>
                      {marker.content}
                    </span>
                    <span className='text-sm opacity-80'>{marker.placeCategory}</span>
                    <span className='text-sm opacity-80'>{marker.placeAddressName}</span>
                    <span className='text-sm opacity-80'>{marker.placeCategoryGroupName}</span>
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
      {mapMenu === '게시판' && (
        <>
          {placeList.length === 0 ? (
            <h1 className='mb-4 text-lg font-bold'>게시글이 존재하지 않습니다.</h1>
          ) : (
            <div className='mx-auto w-full overflow-y-auto py-8'>
              <h1 className='mb-4 pl-4 text-xl font-bold'>게시글 목록</h1>
              <div className='grid grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2'>
                {placeList.map((post) => (
                  <div className='rounded-lg bg-white p-4 shadow-md'>
                    <div className='flex justify-between'>
                      <WriterView writer={post.nickname} date={post.createAt} profile={post.profileUrl} />
                      <StatusView viewCount={post.viewCount} likeCount={post.likeCount} />
                    </div>
                    <h2 className='my-4 text-xl font-semibold'>{post.title}</h2>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm text-gray-500'>댓글 수: {post.CommentCount}</span>
                      <button className='rounded-xl bg-pink-500 px-4 py-2 text-white transition-all hover:bg-pink-600'>
                        자세히 보기
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}
