'use client';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';
import MapHeader from './MapHeader';
import Pagination from 'react-js-pagination';
import { useRecoilValue } from 'recoil';
import { mapMenuState, placeBookmarkListState, placeDetailState, placeListState } from '@/atoms/mapState';
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
  const placeList = useRecoilValue(placeListState);
  const placeBookmarkList = useRecoilValue(placeBookmarkListState);
  const categoryEmojiMap = {
    편의점: '🏪',
    카페: '☕️',
    음식점: '🍽',
    병원: '🏥',
    학교: '🏫',
    문화시설: '🏛',
    숙박: '🏨',
    관광명소: '🏞',
    지하철역: '🚇',
    은행: '💳',
    '주유소,충전소': '⛽️',
    백화점: '🛍',
    약국: '💊',
    주차장: '🅿️',
  };
  function getCategoryEmoji(category) {
    return categoryEmojiMap[category] || '';
  }
  return (
    <motion.div
      className='absolute left-0 z-50 flex h-screen w-[400px] flex-col bg-white shadow-lg'
      initial={{ opacity: 0, x: '-100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 1, x: '-100%' }}
      transition={{ duration: 0.3 }}
    >
      <div className='flex flex-col items-center gap-4 bg-pink-200 px-8 py-2'>
        <Link href='/' className='mr-auto flex items-center'>
          <figure className='p-2'>
            <Image src='/Images/clickpick_icon.png' width={32} height={32} alt='logo' />
          </figure>
          <span className='text-2xl font-bold'>ClickPick</span>
        </Link>
        {/* 검색창 */}
        <form onSubmit={handleSearch} className='relative flex h-[auto] w-full'>
          <input
            className='w-full rounded-[4px] py-3 pl-3 outline-none'
            type='text'
            placeholder='장소, 주소, 검색'
            onChange={handleInputChange}
          />
          <div className='absolute bottom-0 right-4 top-0 flex items-center'>
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
              <h2 className='pl-4 text-lg font-semibold'>검색 결과 ({totalItemsCount}개)</h2>
              {markers.map((marker) => (
                <li key={marker.content.placeUrl}>
                  <div
                    className={`flex h-[100px] w-full flex-col gap-1 border-b py-2 pl-4 transition-all hover:bg-pink-100`}
                  >
                    <div className='flex items-center gap-1'>
                      <span className='cursor-pointer text-lg font-bold' onClick={() => handleMarkerClick(marker)}>
                        {marker.content}
                      </span>
                      <span className='text-md font-normal opacity-80'>
                        {getCategoryEmoji(marker.placeCategoryGroupName)} {marker.placeCategoryGroupName}
                      </span>
                    </div>
                    <span className='text-sm opacity-80'>{marker.placeAddressName}</span>
                    <span className='mr-auto text-sm opacity-60 hover:opacity-100'>
                      <Link href={marker.placeUrl} target='_blank' rel='noopener noreferrer'>
                        홈페이지
                      </Link>
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

      {mapMenu === '즐겨찾기' && (
        <>
          <div className='mx-auto w-full overflow-y-auto py-8'>
            <h1 className='mb-4 pl-4 text-xl font-bold'>즐겨찾기 목록</h1>
            {placeBookmarkList.map((post) => (
              <div
                className={`flex h-[100px] w-full flex-col gap-1 border-b py-2 pl-4 transition-all hover:bg-pink-100`}
              >
                <div className='flex items-center gap-1'>
                  <span
                    className='cursor-pointer text-lg font-bold'
                    onClick={() => {
                      handleMarkerClick({
                        content: post.장소,
                        placeUrl: post.홈페이지,
                        placeCategoryGroupName: post.카테고리,
                        placeAddressName: post.주소,
                        position: { lat: post.yposition, lng: post.xposition },
                      });
                    }}
                  >
                    {post.장소}
                  </span>
                  <span className='text-md font-normal opacity-80'>
                    {getCategoryEmoji(post.카테고리)} {post.카테고리}
                  </span>
                </div>
                <span className='text-sm opacity-80'>{post.주소}</span>
                <span className='mr-auto text-sm opacity-60 hover:opacity-100'>
                  <Link href={post.홈페이지} target='_blank' rel='noopener noreferrer'>
                    홈페이지
                  </Link>
                </span>
              </div>
            ))}
          </div>
        </>
      )}
      {mapMenu === '게시판' && (
        <>
          {placeList.content?.length === 0 ? (
            <h1 className='mb-4 text-lg font-bold'>게시글이 존재하지 않습니다.</h1>
          ) : (
            <div className='mx-auto w-full overflow-y-auto py-8'>
              <h1 className='mb-4 pl-4 text-xl font-bold'>게시글 목록</h1>
              {placeList.content?.map((post) => (
                <div className='rounded-lg bg-white p-4 shadow-md transition-all hover:bg-pink-100'>
                  <div className='flex justify-between'>
                    <WriterView writer={post.nickname} date={post.createAt} profile={post.profileUrl} />
                    <StatusView viewCount={post.viewCount} likeCount={post.likeCount} />
                  </div>
                  <h2 className='my-4 text-xl font-semibold'>{post.title}</h2>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-500'>
                      댓글 수: {post.CommentCount === 0 ? '0' : post.CommentCount}
                    </span>
                    <Link
                      href={`/content/community/${post.postId}`}
                      target='_blank'
                      className='rounded-xl bg-pink-500 px-4 py-2 text-white transition-all hover:bg-pink-600'
                    >
                      자세히 보기
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}
